//prepare the Google Charts API
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(function(){ 
    let lastSearched = window.localStorage.getItem("ganymedeLastSearched");
    app.inputText = (lastSearched && lastSearched != "undefined") ? lastSearched :"Faygin"; 
    app.displayCardData(false);
}); //Draw the user's last searched term on screen after Charts loads

//prepare Firebase access

var firebaseConfig = {
    apiKey: "AIzaSyAJejQ8F3twbtxLh9SJQMy6ZtGRbRMiWcw",
    authDomain: "ganymede-archives.firebaseapp.com",
    databaseURL: "https://ganymede-archives.firebaseio.com",
    projectId: "ganymede-archives",
    storageBucket: "ganymede-archives.appspot.com",
    messagingSenderId: "253585434984",
    appId: "1:253585434984:web:23a8713ebcbb975b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();


const app = new Vue({
    el: '#app',
    data: {
        inputText: "",

        card: {data:{name: "", front_image: ""}},

        displayState: new StateHandler(["card", "list"]),

        listState: new StateHandler(["ratings", "views"]),

        listData: [],

        listLength: 25,
        listOffset: 0, //for presenting pages of information
    },
    created() {
        
    },
    methods: {

        //take the input placed in the search bar and retrieve and display the appropriate card info
        displayCardData(incrementViews) {
            if (this.inputText == "") return;
            
            //TODO validate input here

            fetch(`https://ganymede-archives.herokuapp.com/api/Card/?card_name=${this.inputText}`)
                .then(function (response) {
                    return response.text();
                })
                .then(function (json) {
                    json = JSON.parse(json);
                    console.log(json);

                    if(json.error == undefined) //this card search was valid
                    {
                        window.localStorage.setItem("ganymedeLastSearched", this.inputText);

                        this.card = new Card(json);
                        this.displayState.setTo("card");
                        this.listOffset = 0;

                        if(incrementViews)
                        {
                            //increment the firebase view count for this card
                            firebase.database().ref("views/" + this.card.data.card_title + "/views").transaction(function(currentViews) {
                                return (currentViews || 0) + 1; //add one to the current view count
                            });
                        }
                        
                        this.card.drawVisualizations();
                        
                    }
                    
                }.bind(this));
        }, // end displayCardData

        //allows the user to rate individual cards
        setRating(newRating) {
            let cardName = this.card.data.card_title;
            let prevRating = window.localStorage.getItem("ganymedeRating" + cardName);

            //read the data in from firebase, then edit it
            firebase.database().ref("ratings/" + cardName).once('value').then(function(snapshot) { 
                let data = snapshot.val();

                if(data == null) data = {}; // .val() will return null if there is no child. 

                let newCount = (prevRating) ? (data.ratingCount || 0) : (data.ratingCount || 0) + 1;

                prevRating = (prevRating) ? prevRating : 0; 

                let total = ((data.total || 0) - prevRating) + newRating;
                let avg = total / newCount;

                firebase.database().ref("ratings/" + cardName).set(
                    {
                        ratingCount: newCount,
                        total: total,
                        average: avg
                    }
                );
              });

            window.localStorage.setItem("ganymedeRating" + cardName, newRating); //recording the rating given by this computer
        }, // end setRating

        //sets up the appropriate app states to show the specified list
        displayList() {

            this.displayState.setTo("list");

            this.pullListData(true);
            
        }, // end displayList

        filterChanged(resetPage, newValue)
        {
            this.listState.setTo(newValue);
            this.pullListData(resetPage);
        },

        numberFilterChanged(newNum)
        {
            this.listLength = newNum;
            this.pullListData(true);
        },

        //retrieve the appropriate list data from firebase
        pullListData(resetPage)
        {
            if(resetPage)
                this.offset = 0;

            
            if(this.listState.getCurrentState() == "views")
            {
                firebase.database().ref("views").once('value', this.processSnapshot);
            }
            else
            {
                firebase.database().ref("ratings").once('value', this.processSnapshot);
            }
        },

        //pull out the appropriate amount of data from the given firebase snapshot
        processSnapshot(snapshot)
        {
            let data = snapshot.val();

            if(data == null) return; //no data to list out

            //order the retrieved data
            let orderedData = orderData(data, (this.listState.getCurrentState() == "views") ? "views": "average");
            
            if(this.listOffset + this.listLength > orderedData.length)//the requested page is outside the bounds of the array
            {
                let pages = Math.floor(orderedData.length / this.listLength);

                this.listOffset = pages * this.listLength;
            }

            this.listData = orderedData.slice(this.listOffset, this.listOffset+this.listLength);
        },

        //shifts the list page offset 
        changePage(direction)
        {
            if(direction == "up")
                this.listOffset += this.listLength;
            else
            {
                this.listOffset -= this.listLength;

                if(this.listOffset < 0)
                    this.listOffset = 0;
            }

            this.pullListData(false);
        },

        //tell the card class to draw all of the appropriate data visualizations to the screen
        //this function is triggered by a view event that waits for all of the screen elements to be drawn to the screen
        drawCharts()
        {
            if(this.card.data.card_title)
                this.card.drawVisualizations();
        }


    } // end methods

});

//order the elements in a javascript object by the value at a given key
function orderData(data, relativeTo)
{
    let ordered = [];
    console.log(data[relativeTo]);
    keysSorted = Object.keys(data).sort(function(a,b){return data[b][relativeTo] - data[a][relativeTo]});

    for(let key of keysSorted)
    {
        let obj = {};
        //obj[key] = data[key];
        obj.name = key;

        if(app.listState.getCurrentState() == "views"){
            obj.value = data[key].views;
            obj.qualifier = "views";
        }
        else {
            obj.value = data[key].average;
            obj.qualifier = "stars";
        }

        ordered.push(obj);
    }

    return ordered;

}
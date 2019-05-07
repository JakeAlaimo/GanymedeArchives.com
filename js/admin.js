//prepare the Google Charts API
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(function(){ 
    let lastSearched = localStorage.getItem("ganymedeLastSearched");
    app.inputText = (!lastSearched) ? lastSearched :"Faygin"; 
    app.getCardData();

}); //Draw the user's last searched term on screen after Charts loads


const app = new Vue({
    el: '#app',
    data: {
        inputText: "",
        cards: {data:{name: "", front_image: ""}}
    },
    created() {
    },
    methods: {

        getCardData() {

            if (this.inputText == "") return;
            //this.inputText = "Faygin";
            //TODO validate input here

            fetch(`https://ganymede-archives.herokuapp.com/api/Card/?card_name=${this.inputText}`)
                .then(function (response) {
                    return response.text();
                })
                .then(function (json) {
                    json = JSON.parse(json);
                    console.log(json);

                    if(json.error == undefined)
                    {
                        localStorage.setItem("ganymedeLastSearched", this.inputText);

                        app.card = new Card(json);
                        
    
                        //document.querySelector("img").src = json.front_image;
                        app.card.drawVisualizations();
                    }
                    
                });
        }, // end search

    } // end methods

});

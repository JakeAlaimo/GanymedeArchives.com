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
        ratingData: [],
        viewData: []
    },
    created() {
        
    },
    methods: {
        //retrieve the appropriate list data from firebase
        pullListData(resetPage)
        {
            firebase.database().ref("views").once('value', this.processViews);
            
            firebase.database().ref("ratings").once('value', this.processRatings);
        },

        //pull out the appropriate amount of data from the given firebase snapshot
        processRatings(snapshot)
        {
            let data = snapshot.val();

            if(data == null) return; //no data to list out

            this.ratingData = data;
        },

        processViews(snapshot)
        {
            let data = snapshot.val();

            if(data == null) return; //no data to list out

            this.viewData = data;
        }

    } // end methods

});
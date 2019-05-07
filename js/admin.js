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
    methods: {
        //retrieve the appropriate list data from firebase
        pullListData()
        {
            firebase.database().ref("views").on("value", this.processViews);
            
            firebase.database().ref("ratings").on("value", this.processRatings);
        },

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

    }, // end methods
    created() {
        this.pullListData();
    } 

});
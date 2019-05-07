Vue.component('card-details', {
    props: ['name', 'image', 'winratemodifier'],


        //tell the app when it can draw the appropriate visualizations
        mounted()
        {
            this.$emit('created');
        },

    methods: {

        setRating(rating)
        {
            this.$emit('set-rating', rating);

            //I believe query selector usage here is permitted, as it is used to update CSS, not HTML
            //and it happens to be hooked into through Vue anyway
            //document.querySelector("#rating").innerHTML = "woof";
        }

    }, 

    template: `<section id="content">                  
                    <div id="carddetails">        
                        <img v-bind:src="image" id="cardimg" class="interior"/>
                        <div id="cardinfo">
                            <h2 id="cardname" class="interior">{{ name }}</h2>
                            <h2 id="winrate" class="interior">Winrate Modifier: {{ winratemodifier }}</h2>
                        </div>
                        <div id="rating">
                            <span @click="setRating(1)" class="fa fa-star"></span>
                            <span @click="setRating(2)" class="fa fa-star"></span>
                            <span @click="setRating(3)" class="fa fa-star"></span>
                            <span @click="setRating(4)" class="fa fa-star"></span>
                            <span @click="setRating(5)" class="fa fa-star"></span>
                        </div>
                    </div>
                    <div id="ColumnChart"></div>
                </section>
                `
});

Vue.component('card-list', {
    props: ['list', 'entries'],
    methods: {

        filterChanged()
        {
            this.$emit("filter-changed", true, event.target.value);
        },

        numberFilterChanged()
        {
            this.$emit("num-filter-changed",  event.target.value);
        },

        numberFilterChanged()
        {
            this.$emit("num-filter-changed",  event.target.value);
        },

        pageChange(direction)
        {
            this.$emit("page-change-selected",  direction);
        }
    },
    template: `<section>
    <ul id="listoptions">    
        <li>Entries per page:
        <select @change="numberFilterChanged" v-bind:value="entries">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select></li>
        <li>Sorted by:
        <select @change="filterChanged">
            <option value="ratings">Ratings</option>
            <option value="views">Views</option>
        </select></li>
    </ul>
        <ul v-for="card in list">
            <li >{{ card }}</li>
        </ul>
        <input @click="pageChange('down')" type="button" value="Previous Page"></input>
        <input  @click="pageChange('up')"type="button" value="Next Page"></input>
    </section>`
});
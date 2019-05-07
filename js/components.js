Vue.component('card-details', {
    props: ['name', 'image', 'winratemodifier'],
    template: `<section id="content">                  
                    <div id="carddetails">        
                        <img v-bind:src="image" id="cardimg" class="interior"/>
                        <div id="cardinfo">
                            <h2 id="cardname" class="interior">{{ name }}</h2>
                            <h2 id="winrate" class="interior">Winrate Modifier: {{ winratemodifier }}</h2>
                        </div>
                    </div>
                    <div id="ColumnChart"></div>
                </section>`
});

Vue.component('card-list', {
    props: ['cards'],
    template: `<section>
    <ul id="listoptions">    
        <li>Entries per page:
        <select>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select></li>
        <li>Sorted by:
        <select>
            <option value="ranking">Ranking</option>
            <option value="views">Views</option>
        </select></li>
    </ul>
        <ul>
            <li v-for="card in cards">{{ card.data.card_title }}</li>
        </ul>
        <input type="button" value="Previous Page"></input>
        <input type="button" value="Next Page"></input>
    </section>`
});
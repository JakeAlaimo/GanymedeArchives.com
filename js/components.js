Vue.component('card-details', {
    props: ['name', 'image', 'winratemodifier'],
    template: `<section>                  
                    <img v-bind:src="image" id="cardimg"/>
                    <h2 id="cardname">{{ name }}</h2>
                    <h2 id="winrate">Winrate: {{ winratemodifier }}</h2>
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
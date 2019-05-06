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
        <ul>
            <li v-for="card in cards">{{ card.card_title }}</li>
        </ul>
    <section>`
});
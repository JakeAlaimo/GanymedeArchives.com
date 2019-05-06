Vue.component('card-details', {
    props: ['name', 'image', 'winratemodifier'],
    template: `<section>                  
                    <img v-bind:src="image" id="cardimg"/>
                    <h2 id="cardname">{{ name }}</h2>
                    <h2 id="winrate">Winrate: {{ winratemodifier }}</h2>
                </section>`
});
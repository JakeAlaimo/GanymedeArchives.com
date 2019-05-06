Vue.component('card-details', {
    props: ['name', 'image'],
    template: `<section>
                    <h2>{{name}}</h2>
                    <img v-bind:src='image' />
                </section>`
});
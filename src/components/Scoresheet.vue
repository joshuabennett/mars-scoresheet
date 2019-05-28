<template>
    <section class="section">
        <div class="box">
            <div class="columns">
                <div class="column">Name</div>
                <div class="column">TR</div>
                <div class="column">Awards</div>
                <div class="column">Milestones</div>
                <div class="column">Cities</div>
                <div class="column">Greenery</div>
                <div class="column">Cards</div>
            </div>
            <app-player v-for='player in players'>{{ player.name }} </app-player>
        </div>
        <button class="button is-fullwidth is-primary">Results</button>
    </section>
</template>

<script>
import Player from './Player.vue';

export default {
    data: function() {
        return {
            players: [
                {
                    name: 'Joshua',
                }
            ]
        }
    },
    components: {
        'app-player': Player
    }
}
</script>

<style>

</style>
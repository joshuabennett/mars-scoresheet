<template>
    <section class="section">
        <div class="box">
            <div class="columns">
                <div class="column"> Name</div>
                <div class="column"><i class="fas fa-globe-americas"></i>  TR</div>
                <div class="column"><i class="fas fa-award"></i>  Awards</div>
                <div class="column"><i class="fas fa-trophy"></i>  Milestones</div>
                <div class="column"><i class="fas fa-city"></i>  Cities</div>
                <div class="column"><i class="fas fa-leaf"></i>  Greenery</div>
                <div class="column"><i class="fas fa-id-card-alt"></i>  Cards</div>
            </div>
            <app-player 
                v-for='(player, index) in players' 
                :index='index + 1' :value='player' 
                @input="(newPlayer) => {player = newPlayer}" />
            <p class="buttons">
                <a class="button">
                    <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                    </span>
                    <span @click.prevent='addPlayer'>Add Player</span>
                </a>
            </p>
        </div>
    </section>
</template>

<script>
import Player from './Player.vue';
import { eventBus } from '../main.js';

export default {
    data: function() {
        return {
            players: [
                {
                    name: '',
                    rating: 0,
                    awards: 0,
                    milestones: 0,
                    cities: 0,
                    greenery: 0,
                    cards: 0,
                    finalScore: 0
                }
            ]
        }
    },
    inject: ['$validator'],
    methods: {
        addPlayer() {
            this.players.push(
                {
                    name: '',
                    rating: 0,
                    awards: 0,
                    milestones: 0,
                    cities: 0,
                    greenery: 0,
                    cards: 0,
                    finalScore: 0
                    });
        }
    },
    components: {
        'app-player': Player
    },
    created() {
        eventBus.$on('resultsSubmit', (data) => {
            eventBus.$emit('resultsSubmit2', this.players);
        });
    },
    provide() {
      return {
        $validator: this.$validator,
      }
    }
}
</script>

<style>
.box {
    background: rgb(202, 107, 78);
    color: white;
}
</style>
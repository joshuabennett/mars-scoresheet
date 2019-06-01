<template>
    <section class="section">
        <div class="box">
            <div class="columns">
                <div class="column"> Rank</div>
                <div class="column"> Name</div>
                <div class="column"> Final Score</div>
                <div class="column final"><i class="fas fa-globe-americas"></i>  TR</div>
                <div class="column final"><i class="fas fa-award"></i>  Awards</div>
                <div class="column final"><i class="fas fa-trophy"></i>  Milestones</div>
                <div class="column final"><i class="fas fa-city"></i>  Cities</div>
                <div class="column final"><i class="fas fa-leaf"></i>  Greenery</div>
                <div class="column final"><i class="fas fa-id-card-alt"></i>  Cards</div>
            </div>
            <div class="columns" v-for='(player, index) in players'>
                <div class="column"> {{ index + 1 }} </div>
                <div class="column"> {{ player.name }} </div>
                <div class="column"> {{ player.finalScore }} </div>
                <div class="column final"> {{ player.rating }} </div>
                <div class="column final"> {{ player.awards }} </div>
                <div class="column final"> {{ player.milestones }} </div>
                <div class="column final"> {{ player.cities }} </div>
                <div class="column final"> {{ player.greenery }} </div>
                <div class="column final"> {{ player.cards }} </div>
            </div>
            <button class="button is-primary" @click="printPlayers">Print</button>
        </div>
    </section>
</template>

<script>
import { eventBus } from '../main.js';

export default {
    data: function () {
        return {
            players: []
        }
    },
    methods: {
        printPlayers() {
            console.log(this.pla)
        }
    },
    created() {
        eventBus.$on('resultsSubmit2', (data) => {
            this.players = data;
            for (let i = 0; i < this.players.length; i++) {
                let curr = this.players[i];
                this.players[i].finalScore = Number(curr.rating) + Number(curr.awards) + Number(curr.milestones) + Number(curr.cities) + Number(curr.greenery) + Number(curr.cards);
            }
            this.players.sort(function(a,b) {
                return (Number(b.finalScore) - Number(a.finalScore));
            });
        });
    }

}
</script>

<style>
    .final {
        font-size: 11px;
    }
</style>
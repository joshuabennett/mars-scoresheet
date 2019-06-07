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
                <div class="column final rating" :class='player.name'> {{ player.rating }} </div>
                <div class="column final awards" :class='player.name'> {{ player.awards }} </div>
                <div class="column final milestones" :class='player.name'> {{ player.milestones }} </div>
                <div class="column final cities" :class='player.name'> {{ player.cities }} </div>
                <div class="column final greenery" :class='player.name'> {{ player.greenery }} </div>
                <div class="column final cards" :class='player.name'> {{ player.cards }} </div>
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
            var highestData = {
                rating: [],
                awards: [],
                milestones: [],
                cities: [],
                greenery: [],
                cards: [],
            };
            for (let i = 0; i < this.players.length; i++) {
                let curr = this.players[i];
                console.log(curr.name);

                for (var property in curr) {
                    if (curr.hasOwnProperty(property)) {
                        console.log(property);
                        if(highestData[property]) {
                            highestData[property].push([curr.name, curr[property]]);
                        }
                    }
                }
                // Loop through the player object and add it's value to highest data table.

                // Calculte final score for each player and add it to player object.
                this.players[i].finalScore = Number(curr.rating) + Number(curr.awards) + Number(curr.milestones) + Number(curr.cities) + Number(curr.greenery) + Number(curr.cards);
            }

            // Sort players object on the final score attribute descending
            this.players.sort(function(a,b) {
                return (Number(b.finalScore) - Number(a.finalScore));
            });
            
            console.log(highestData);
            // Sort individual categories by value.
            // const categories = Object.keys(highestData);
            // for (const cat in categories) {
            //     highestData[cat].sort( function(a,b) {
            //         return b[1] - a[1];
            //     });
            // }

            for (var property2 in highestData) {
                    if (highestData.hasOwnProperty(property2)) { 
                        highestData[property2].sort( function(a,b) {
                            return b[1] - a[1];
                        });
                    }
            }
            
            // Add styling for the top 3 in each category. Gold 1st, Silver 2nd, Bronze 3rd.
            let name, catToStyle;
            for (var property4 in highestData) {
                if (highestData.hasOwnProperty(property4)) {
                    let name = highestData[property4][1][0];
                    let catToStyle = property4;
                    console.log('.'+name+'.'+catToStyle);
                    setTimeout( function() {
                       var el = document.getElementsByClassName(catToStyle+' '+name);
                        console.log((el)[0]);
                        el[0].style.backgroundColor = '#C0C0C0'; 
                    }, 500);
                    
                }
            }
            for (var property3 in highestData) {
                if (highestData.hasOwnProperty(property3)) {
                    let name = highestData[property3][0][0];
                    let catToStyle = property3;
                    console.log('.'+name+'.'+catToStyle);
                    setTimeout( function() {
                       var el = document.getElementsByClassName(catToStyle+' '+name);
                        console.log((el)[0]);
                        el[0].style.backgroundColor = '#FFD700'; 
                    }, 500);
                    
                }
            }

        });
    }

}
</script>

<style>
    .final {
        font-size: 11px;
    }
</style>

<template>
    <!-- // TODO: Make a Mobile Results page that splits final rankings seperate from category rankings to allow for bigger presentation. -->
    <section class="section"> 
        <div class="box">
            <div class="columns" v-if='!mobile'>
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
            <div class="columns is-flex-mobile" v-if='mobile'>
                <div class="column"></div>
                <div class="column"></div>
                <div class="column">Score</div>
                <div class="column final"><i class="fas fa-globe-americas"></i></div>
                <div class="column final"><i class="fas fa-award"></i></div>
                <div class="column final"><i class="fas fa-trophy"></i></div>
                <div class="column final"><i class="fas fa-city"></i></div>
                <div class="column final"><i class="fas fa-leaf"></i></div>
                <div class="column final"><i class="fas fa-id-card-alt"></i></div>
            </div>
            <div class="columns is-flex-mobile" v-for='(player, index) in players'>
                <div class="column" :class='player.name'> {{ index + 1 }} </div>
                <div class="column" :class='player.name'> {{ player.name }} </div>
                <div class="column" :class='player.name'> {{ player.finalScore }} </div>
                <div class="column final rating" :class='player.name'> <span class='tag is-rounded is-small'>{{ player.rating }} </span></div>
                <div class="column final awards" :class='player.name'> <span class='tag is-rounded is-small'>{{ player.awards }} </span></div>
                <div class="column final milestones" :class='player.name'> <span class='tag is-rounded is-small'>{{ player.milestones }} </span></div>
                <div class="column final cities" :class='player.name'> <span class='tag is-rounded is-small'>{{ player.cities }}</span> </div>
                <div class="column final greenery" :class='player.name'> <span class='tag is-rounded is-small'>{{ player.greenery }} </span></div>
                <div class="column final cards" :class='player.name'> <span class='tag is-rounded is-small'>{{ player.cards }} </span></div>
            </div>
        </div>
    </section>
</template>

<script>
import { eventBus } from '../main.js';

export default {
    data: function () {
        return {
            players: [],
        }
    },
    props: ['mobile'],
    methods: {
    },
    created() {
        eventBus.$on('resultsSubmit2', (data) => {

            // Create a new array that stores all the highest scores in each category and the corresponding player.
            this.players = data;
            var highestData = {
                rating: [],
                awards: [],
                milestones: [],
                cities: [],
                greenery: [],
                cards: [],
            };
            // Loop through each player's scores and add each of their scores to a table containing their score and name in each category.
            for (let i = 0; i < this.players.length; i++) {
                let curr = this.players[i];
                for (var property in curr) {
                    if (curr.hasOwnProperty(property)) {
                        console.log(property);
                        if(highestData[property]) {
                            highestData[property].push([curr.name, curr[property]]);
                        }
                    }
                }

                // Calculte final score for each player and add it to player object.
                this.players[i].finalScore = Number(curr.rating) + Number(curr.awards) + Number(curr.milestones) + Number(curr.cities) + Number(curr.greenery) + Number(curr.cards);
            }

            // Sort players object on the final score attribute descending
            this.players.sort(function(a,b) {
                return (Number(b.finalScore) - Number(a.finalScore));
            });
            
            // Sort individual categories by score
            for (var property2 in highestData) {
                    if (highestData.hasOwnProperty(property2)) { 
                        highestData[property2].sort( function(a,b) {
                            return b[1] - a[1];
                        });
                    }
            }

            var playersLength = this.players.length;
            var sortedPlayers = this.players;

            // Function to set the border of an entire row at (position) to (color).
            var setBorders = function(color, position) {
                setTimeout( function() {
                    if (playersLength < position) {
                        return false;
                    }
                    var row = document.getElementsByClassName(sortedPlayers[position-1].name);
                    for (let i = 0; i < row.length; i++) {
                        row[i].style.borderTop = 'solid 2px ' + color;
                        row[i].style.borderBottom = 'solid 2px ' + color;
                    }
                    row[0].style.borderLeft = 'solid 2px ' + color;
                    row[row.length-1].style.borderRight = 'solid 2px ' + color;
                }, 500);
            };

            // Set 1st to Gold, 2nd to Silver, and 3rd to Bronze.
            setBorders('#FFD700',1);
            setBorders('#C0C0C0',2);
            setBorders('#dca671',3);


            // Takes the position (1st, 2nd, 3rd, etc) and sets the tag background color for those elements to specified color for each scoring category.
            var setCategoryColor = function(color, position) {
                let name, catToStyle;
                if (playersLength < position) {
                    return false;
                }
                for (var property4 in highestData) {
                    if (highestData.hasOwnProperty(property4)) {
                        let name = highestData[property4][position-1][0];
                        let catToStyle = property4;
                        console.log('.'+name+'.'+catToStyle);
                        setTimeout( function() {
                        var el = document.getElementsByClassName(catToStyle+' '+name);
                            el[0].firstElementChild.style.backgroundColor = color; 
                            // if (position === 3) {
                            //     el[0].firstElementChild.style.color = 'white'; 
                            // }
                        }, 500);
                        
                    }
                }
            };

            // Set 1st to Gold, 2nd to Silver, 3rd to Bronze.
            setCategoryColor('#dca671', 3);
            setCategoryColor('#C0C0C0', 2);
            setCategoryColor('#FFD700', 1);

        });
    }

}
</script>

<style>
    .box {
        background: rgb(202, 107, 78);
        color: white;
    }
    .final {
        font-size: 11px;
    }
    .column {
        margin-top: 5px;
    }

@media all and (max-width: 600px) {
    .column {
        font-size: 8px;
        padding: 6px;
    }
    .tag:not(body) {
        font-size: 8px;
        height: 1.5em;
    }
}
    
</style>
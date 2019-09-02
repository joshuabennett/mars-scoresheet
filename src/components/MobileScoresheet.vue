<template>
    <section class="section">
        <div class="box">
            <div class="tabs is-toggle is-fullwidth is-marginless">
                <ul>
                    <li :class="{'is-active' : activeItem == 'name'}">
                    <a @click="activeItem = 'name'">
                        <i class="fas fa-user"></i>
                    </a>
                    </li>
                    <li :class="{'is-active' : activeItem == 'rating'}">
                    <a @click="activeItem = 'rating'">
                        <i class="fas fa-globe-americas"></i>
                    </a>
                    </li>
                    <li :class="{'is-active' : activeItem == 'awards'}">
                    <a @click="activeItem = 'awards'">
                        <i class="fas fa-award"></i>
                    </a>
                    </li>
                    <li :class="{'is-active' : activeItem == 'milestones'}">
                    <a @click="activeItem = 'milestones'">
                        <i class="fas fa-trophy"></i>
                    </a>
                    </li>
                    <li :class="{'is-active' : activeItem == 'cities'}">
                    <a @click="activeItem = 'cities'">
                        <i class="fas fa-city"></i>
                    </a>
                    </li>
                    <li :class="{'is-active' : activeItem == 'greenery'}">
                    <a @click="activeItem = 'greenery'">
                        <i class="fas fa-leaf"></i>
                    </a>
                    </li>
                    <li :class="{'is-active' : activeItem == 'cards'}">
                    <a @click="activeItem = 'cards'">
                        <i class="fas fa-id-card-alt"></i>
                    </a>
                    </li>
                </ul>
            </div>
            <section class="players-info">
                <div class="columns is-flex-mobile" v-if="activeItem != 'name'">
                    <div class="column"> Name</div>
                    <div class="column"> {{ activeItem.charAt(0).toUpperCase() + activeItem.slice(1) }} Score</div>
                </div>
                <div class="columns is-flex-mobile" v-for='player in players'>
                    <div class="column player-name" v-if="activeItem != 'name'"> {{ player.name }}</div>
                    <div class="column"> <input class='input' type="text" :placeholder='getPlaceholder' v-model='player[activeItem]'> </div>
                </div>
                <p class="buttons" v-if="activeItem == 'name'">
                    <a class="button">
                        <span class="icon is-small">
                        <i class="fas fa-plus"></i>
                        </span>
                        <span @click.prevent='addPlayer'>Add Player</span>
                    </a>
                </p>
            </section>
        </div>
    </section>
</template>

<script>
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

            ],
            // Stores current Tab, defaulting to players page.
            activeItem: 'name'
        }
    },
    computed: {

        // Dynamic Placeholder names.
        getPlaceholder() {
            return this.activeItem == 'name' ? 'Name' : 'Score';
        }
    },
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
    created() {

        // Catch that event has been submitted so that we can pass the players array to the results component through
        // another event.
        eventBus.$on('resultsSubmit', (data) => {
            eventBus.$emit('resultsSubmit2', this.players);
        });
    }
}
</script>

<style scoped>
    .box {
        background: rgb(202, 107, 78);
        color: white;
        padding: 0px;
    }
    .players-info {
        padding: 15px;
    }
    .columns {
        margin: 0px;
        padding: 0px;
    }
    .column {
        margin: 0px;
        padding: 1px;
    }
    .tabs.is-toggle li.is-active a {
        background-color: black;
        border-color: black;
        color: #fff;
        z-index: 1;
    }   
    .tabs.is-toggle a {
        border-color: rgba(0, 0, 0, 0.555);
    }
    .player-name {
        font-size: 18px;
        display: flex;
        align-items: center;
    }
</style>

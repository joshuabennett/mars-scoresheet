<template>
  <div id='app'>    
    <div class='columns'>
      <div class="column is-one-fifth">
        <!-- spacing column -->
      </div>
      <div class="column">
        <app-header></app-header>
        <transition-group name='pop' appear mode='out-in'>
          <app-scoresheet v-if='!submitted' @results='submitted = !submitted' key='scoresheet'></app-scoresheet>
          <app-results v-show='submitted' key='resultsheet'></app-results>
        </transition-group>
        <section class="section results">
          <button class="button is-fullwidth is-primary" @click.prevent='getResults'> {{ buttonName }}</button>
        </section>
        <hr>
        <section class='section footer'>
                      <a class="button" href='https://github.com/joshuabennett/mars-scoresheet'>
              <span class="icon is-small">
                <i class="fab fa-github"></i>
              </span>
              <span> Github </span>
            </a>
            <br><br>
          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-dark">Vue</span>
                <span class="tag is-info">2.6.10</span>
              </div>
            </div>

            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-dark">Bulma</span>
                <span class="tag is-success">0.7.5</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="column is-one-fifth">
        <!-- spacing column -->
      </div>
    </div>
  </div>
</template>


<script>
import Header from './components/Header.vue';
import Scoresheet from './components/Scoresheet.vue';
import Results from './components/Results.vue';
import { eventBus } from './main.js';

export default {
  data: function() {
    return {
      submitted: false,
      buttonName: 'Results'
    }
  },
  components: {
    'app-header': Header,
    'app-scoresheet': Scoresheet,
    'app-results': Results
  },
  methods: {
    getResults() {
        this.submitted = !this.submitted;
        (this.buttonName === 'Results') ? this.buttonName = 'New Game' : this.buttonName = 'Results';
        eventBus.$emit('resultsSubmit', this.submitted);
    }
  }
}
</script>

<style>
  #app {
    margin-top: 5%;
  }
  .section {
    padding: 10px;
  }
  .pop-enter {
    opacity: 0;
  }
  .pop-enter-active {
    transition: opacity 1s;
  }
  .pop-leave {
    /* opacity: 1; */
  }
  .pop-leave-active {
    transition: opacity 1s;
    opacity: 0;
    position: absolute;

  }

  .pop-move {
    transition: transform 1s;
  }
</style>

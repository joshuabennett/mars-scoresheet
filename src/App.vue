<template>
  <div id='app'>    
    <div class='columns'>
      <div class="column is-one-fifth">
        <!-- spacing column -->
      </div>
      <div class="column">
        <app-header></app-header>
        <transition name='pop' appear>
          <app-scoresheet v-if='!submitted' @results='submitted = !submitted'></app-scoresheet>
        </transition>
        <section class="section results">
          <button class="button is-fullwidth is-primary" @click.prevent='getResults'>Results</button>
        </section>
        <transition name='pop'>
          <app-results v-if='submitted'></app-results>
        </transition>
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

export default {
  data: function() {
    return {
      submitted: false
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
    }
  }
}
</script>

<style>
  .section {
    padding: 10px;
  }
  .pop-enter {
    opacity: 0;
  }

  .pop-enter-active {
    transition: opacity 1s;
    opacity: 1;
  }

  .pop-leave-active {
    transition: opacity 1s;
    opacity: 0;

  }
  .pop-leave {

  }


</style>

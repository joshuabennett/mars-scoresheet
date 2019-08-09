<template>
  <div id='app'>    
    <div class='columns' :class="{'main' : !mobile }">
      <div class="column is-one-fifth">
        <!-- spacing column -->
      </div>
      <div class="column">
        <app-header v-if='!mobile'></app-header>
        <transition-group name='pop' appear mode='out-in'>
          <app-scoresheet v-if='!submitted && !mobile' @results='submitted = !submitted' key='scoresheet'></app-scoresheet>
          <app-results v-show='submitted' key='resultsheet' :mobile='mobile'></app-results>
        </transition-group>
        <app-mobile-scoresheet v-if='!submitted && mobile' @results='submitted = !submitted'></app-mobile-scoresheet>
        <section class="section results">
          <button class="button is-fullwidth resultbtn" @click.prevent='getResults'> {{ buttonName }}</button>
          <br>
          <div class="notification is-dark has-text-danger" v-if='!isDeleted'>
            <button class="delete" @click='isDeleted = !isDeleted'></button>
            Please correct any errors!
          </div>
        </section>
       
        <section class='section footer has-text-centered'>
                      <a class="button is-dark" href='https://github.com/joshuabennett/mars-scoresheet'>
              <span class="icon is-small">
                <i class="fab fa-github"></i>
              </span>
              <span> Github </span>
            </a>
            <br><br>
          <!-- <div class="field is-grouped is-grouped-multiline">
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
          </div> -->
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
import MobileScoresheet from './components/MobileScoresheet';
import { eventBus } from './main.js';

export default {
  data: function() {
    return {
      submitted: false,
      buttonName: 'Results',
      isDeleted: true,
      mobile: window.innerWidth <= 700 
    }
  },
  components: {
    'app-header': Header,
    'app-scoresheet': Scoresheet,
    'app-results': Results,
    'app-mobile-scoresheet': MobileScoresheet
  },
   provide() {
      return {
        $validator: this.$validator,
      }
    },
  methods: {
    getResults() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.submitted = !this.submitted;
          (this.buttonName === 'Results') ? this.buttonName = 'New Game' : this.buttonName = 'Results';
          eventBus.$emit('resultsSubmit', this.submitted);
          return;
        }
        this.isDeleted = false;
      });
    },
    created() {
      addEventListener('resize', () => {
        this.mobile = innerWidth <= 700
      });
    }
  }
}
</script>

<style>
  html {
    background: #ff4e50; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ff4e50, #f9d423); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ff4e50, #f9d423); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .resultbtn {
    background: rgb(202, 107, 78);
    color: white;
    border: none;
  }
  .section {
    background: transparent;
  }
  .main {
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

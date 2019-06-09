<template>
    <div class="columns">
        <div class="column player-column">
            <input class='input' :name="index +'name'" v-validate="'required|alpha_num'" type="text" :placeholder="'Player ' + index" v-model='value.name' 
            :class="{'is-danger' : errors.has(index + 'name')}" autocomplete="off">
        </div>
        <div class="column">
            <input :name="index + 'rating'" class='input' type="text" v-validate="'required|numeric'" placeholder='0' v-model='value.rating'
            :class="{'is-danger' : errors.has(index + 'rating')}" autocomplete="off">
            <span v-show="errors.has(index + 'rating')" class='is-size-7 valerror'> Requires a number </span>
        </div>
        <div class="column">
            <input :name="index + 'awards'" class='input' type="text" placeholder='0' v-validate="'required|numeric'" v-model='value.awards'
            :class="{'is-danger' : errors.has(index + 'awards')}" autocomplete="off">
            <span v-show="errors.has(index + 'awards')" class='is-size-7 valerror'> Requires a number </span>
        </div>
        <div class="column">
            <input :name="index + 'milestones'" class='input' type="text" placeholder='0' v-validate="'required|numeric'"  v-model='value.milestones'
            :class="{'is-danger' : errors.has(index + 'milestones')}" autocomplete="off">
            <span v-show="errors.has(index + 'milestones')" class='is-size-7 valerror'> Requires a number </span>
        </div>
        <div class="column">
            <input :name="index + 'cities'" class='input' type="text" placeholder='0' v-validate="'required|numeric'" v-model='value.cities' 
            :class="{'is-danger' : errors.has(index + 'cities')}" autocomplete="off">
            <span v-show="errors.has(index + 'cities')" class='is-size-7 valerror'> Requires a number </span>
        </div>
        <div class="column">
            <input :name="index + 'greenery'" class='input' type="text" placeholder='0' v-validate="'required|numeric'" v-model='value.greenery' 
            :class="{'is-danger' : errors.has(index + 'greenery')}" autocomplete="off">
            <span v-show="errors.has(index + 'greenery')" class='is-size-7 valerror'> Requires a number </span>
        </div>
        <div class="column">
            <input  :name="index + 'cards'" class='input' type="text" placeholder='0' v-validate="'required|numeric'" v-model='value.cards' 
            :class="{'is-danger' : errors.has(index + 'cards')}" autocomplete="off">
            <span v-show="errors.has(index + 'cards')" class='is-size-7 valerror'> Requires a number </span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value', 'index'],
    inject: ['$validator'],
    watch: {
        value() {
            this.$emit('input', this.value);
        }
    }
}
</script>

<style>
.valerror {
     color: rgb(245, 169, 169);
}
.player-column {

}
input {
}
</style>
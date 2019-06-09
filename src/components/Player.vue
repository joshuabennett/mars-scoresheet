<template>
    <div class="columns">
        <div class="column player-column">
            <input class='input' name="name" v-validate="'required|alpha_num'" type="text" :placeholder="'Player ' + index" v-model='value.name' 
            :class="{'is-danger' : errors.has('name')}">
        </div>
        <div class="column">
            <input name='rating' class='input' type="text" v-validate="'required|numeric'" placeholder='0' v-model='value.rating'
            :class="{'is-danger' : errors.has('rating')}">
            <span v-show="errors.has('rating')" class='is-size-7 valerror'> Requires a number </span>
        </div>
        <div class="column">
            <input name='awards' class='input' type="text" placeholder='0' v-validate="'required|numeric'" v-model='value.awards'
            :class="{'is-danger' : errors.has('awards')}">
            <span v-show="errors.has('awards')" class='is-size-7 valerror'> Requires a number </span>
        </div>
        <div class="column">
            <input name='milestones' class='input' type="text" placeholder='0' v-validate="'required|numeric'"  v-model='value.milestones'
            :class="{'is-danger' : errors.has('milestones')}">
            <span v-show="errors.has('milestones')" class='is-size-7 valerror'> Requires a number </span>
        </div>
        <div class="column">
            <input name='cities' class='input' type="text" placeholder='0' v-validate="'required|numeric'" v-model='value.cities' 
            :class="{'is-danger' : errors.has('cities')}">
            <span v-show="errors.has('cities')" class='is-size-7 valerror'> Requires a number </span>
        </div>
        <div class="column">
            <input name='greenery' class='input' type="text" placeholder='0' v-validate="'required|numeric'" v-model='value.greenery' 
            :class="{'is-danger' : errors.has('greenery')}">
            <span v-show="errors.has('greenery')" class='is-size-7 valerror'> Requires a number </span>
        </div>
        <div class="column">
            <input  name='cards' class='input' type="text" placeholder='0' v-validate="'required|numeric'" v-model='value.cards' 
            :class="{'is-danger' : errors.has('cards')}">
            <span v-show="errors.has('cards')" class='is-size-7 valerror'> Requires a number </span>
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
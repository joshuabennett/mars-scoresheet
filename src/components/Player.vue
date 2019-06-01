<template>
    <div class="columns">
        <div class="column player-column">
            <input class='input' type="text" :placeholder="'Player ' + index" v-model='value.name'>
        </div>
        <div class="column">
            <input name='rating' class='input' type="text" placeholder='0' v-model='value.rating'>
        </div>
        <div class="column">
            <input class='input' type="text" placeholder='0' v-model='value.awards'>
        </div>
        <div class="column">
            <input class='input' type="text" placeholder='0' v-model='value.milestones'>
        </div>
        <div class="column">
            <input class='input' type="text" placeholder='0' v-model='value.cities'>
        </div>
        <div class="column">
            <input class='input' type="text" placeholder='0' v-model='value.greenery'>
        </div>
        <div class="column">
            <input class='input' type="text" placeholder='0' v-model='value.cards'>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value', 'index'],
    watch: {
        value() {
            this.$emit('input', this.value);
        }
    }
}
</script>

<style>
.player-column {

}
input {
}
</style>
<template>
  <div>
    <h3> --| {{$store.state.count}} |-- </h3>
    <h3> --| {{$store.getters.count}} |-- </h3>
    <button @click="add">增加</button>
    <button @click="addMore">蓄力增加</button>
  </div>
</template>

<script>

export default {
  name: 'Vuex',
  data () {
    return {
    }
  },
  components: {
  },
  created () {
    console.log('this.$store.getters.count: ', this.$store.getters);
    console.log('this.$store: ', this.$store);
    console.log('this.$store.state.count: ', this.$store.state.count);
  },
  methods: {
    add () {
      this.$store.commit('increment')
    },
    addMore () {
      this.$store.dispatch('incrementAsync', 2)
    }
  }
}
</script>

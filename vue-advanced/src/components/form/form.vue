<template>
  <form action="javascript:void(0);">
    <slot></slot>
    <!-- {{model}} -->
    <!-- {{rules}} -->
  </form>
</template>

<script>

export default {
  name: 'Form',
  components: {

  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  provide () {
    return {
      form: this
    }
  },
  methods: {
    validate (cb) {
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
      Promise.all(tasks).then((res) => {
        cb(true)
      }).catch(() => {
        cb(false)
      })

    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

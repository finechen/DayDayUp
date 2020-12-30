<!-- form.vue -->
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
    // 校验表单
    validate (cb) {
      // 所有表单检验结果
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
      Promise.all(tasks).then((res) => {
        // 全校验通过返回 true
        cb(true)
      }).catch(() => {
        // 有一个不通过即返回 false
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


<template>
  <div>
    <input type="text" :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script >
export default {
  name: 'FormInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      errMsg: ''
    };
  },
  methods: {
    // 监听输入框变化
    onInput (e) {
      // this.$emit('input', e.target.value);
      // 输入框变化后进行检验通知
      this.$parent.$emit('validate');
    }
  }
};
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

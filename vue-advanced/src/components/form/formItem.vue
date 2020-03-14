<template>
  <div>
    <label v-if="label" for="">{{ label }}</label>
    <slot></slot>
    <p v-if="errMsg">{{ errMsg }}</p>
    <!-- {{form.rules}} -->
  </div>
</template>

<script>
import Schema from 'async-validator'

export default {
  name: 'FormItem',
  inject: ['form'],
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  },
  data () {
    return {
      errMsg: ''
    }
  },
  mounted () {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate () {
      const value = this.form.model[this.prop]
      const rules = this.form.rules[this.prop]
      // npm i async-validate -S
      const desc = { [this.prop]: rules }
      console.log('desc: ', desc);
      const schema = new Schema(desc)
      // return的是校验结果的promise
      const res = schema.validate({ [this.prop]: value }, err => {
        if (err) {
          this.errMsg = err[0].message
          throw false
        } else {
          this.errMsg = ''
          return true
        }
      })
      console.log('res: ', res);
      return res
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

<template>
  <div class="notice" v-if="isShow">
    <h3 class="notice-title">{{title}}</h3>
    <p class="notice-msg">{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 1500
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    show () {
      this.isShow = true
      setTimeout(this.hide, this.duration)
      console.log('this.duration: ', this.duration);
    },
    hide () {
      this.isShow = false
      this.remove()
    }
  },
}
</script>

<style lang="scss" scoped>
.notice {
  position: fixed;
  background: #fff;
  width: 60vw;
  padding: 15px;
  border-radius: 8px;
  left: calc(50% - 30vw);
  top: 50px;
  border: 1px solid rgb(146, 41, 41);
  .notice-title {
    font-size: 24px;
    text-align: center;
    padding: 0;
    margin: 0;
  }
  .notice-msg {
    border-top: 1px solid rgb(146, 41, 41);
    line-height: 50px;
  }
}
</style>
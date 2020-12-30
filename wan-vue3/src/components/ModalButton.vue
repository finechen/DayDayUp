<template>
  <button type="" @click="isModal = true">弹出一个模态框</button>
  <teleport to='body' >
    <div v-if="isModal" class="modal">
      <div class="content">
        这是一个弹框 我的父元素是body
        <button @click="isModal = false">关闭</button>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ModalButton',
  setup() {
    let  isModal = ref(false)
    return { isModal }
   
  }
}

</script>

<style scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.5);
  top: 0;
  left: 0;
  padding: 100px;
  box-sizing: border-box;
}
.content {
  background: #fff;
  padding: 100px;
}
</style>

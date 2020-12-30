<template>
  <!-- composition -->
  <h1>{{msg}}</h1>
  <p>Edit <code>components/HelloWorld.vue</code>  to set hot moudle </p>
  <p> Hello Vite!!!</p>
  <!-- composition -->
  <Composition />
  <!-- teleport Modal -->
  <ModalButton/>

</template>

<script>
import Composition from './Composition.vue'
import ModalButton from './ModalButton.vue'
export default {
  name: 'HelloWorld',
  props:{
    msg:{
      type: String
    }
  },
  components:{
    Composition,
    ModalButton
  },
  setup() {

    
  }
}

</script>

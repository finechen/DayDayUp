<template>
  <!-- composition -->
  <p>counter: {{counter}} ; doublecounter: {{doubleCounter}} <button type="" @click="counter++">Add</button></p>
  <div ref="desc"></div>
  <!-- teleport Modal -->
</template>

<script>
import { ref, reactive, computed , onMounted, toRefs, watch} from 'vue'
export default {
  name: 'Composition',
  setup() {

    //  counter 相关
    const data  = useCounter()

    // 基础类型 单值响应式
    const msg2 = ref('base type : msg ')

    // 元素引用
    const desc = ref(null)

    // 
    watch(()=> data.counter, (val,pre)=>{
      const p = desc.value
      p.textContent = `counter change from ${pre} to ${val}`
    })


    return {...toRefs(data),desc}  
  }
}

function useCounter() {
    const data = reactive({ 
      counter : 1,
      doubleCounter: computed(()=> data.counter * 2)
    })
    let timer
    onMounted(()=>{
      timer = setInterval(()=>{
        data.counter++
      },1000)
    })
    return data
}
</script>

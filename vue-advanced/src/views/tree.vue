<template>
  <div>
    <ul>
      <tree-item class="item" :model="treeData"></tree-item>
    </ul>
  </div>
</template>

<script>
import data from '@/assets/data.json'
import TreeItem from '@/components/tree/treeItem.vue'
export default {
  data () {
    return {
      treeData: data
    }
  },
  components: {
    TreeItem
  },
  created () {
    console.log('data: ', data);
  }
}
</script>

<style>
</style>
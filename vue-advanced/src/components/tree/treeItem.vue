<template>
  <li>
    <div @click="toggle" class="wrap">
      {{model.title}}
      <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <tree-item class="item" v-for="model in model.children" :model="model" :key="model.index"></tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    model: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      open: false
    }
  },
  computed: {
    isFolder () {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle () {
      if (!this.isFolder) return
      this.open = !this.open
    }
  },
}
</script>

<style lang="scss">
.wrap {
  text-align: left;
}
</style>
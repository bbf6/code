<template lang="pug">
#tree-file.q-gutter-sm.bg-primary
  q-tree.cursor-pointer(
    :nodes="fileStore.tree"
    dense
    node-key="key"
    no-connectors
    :default-expand-all="true"
    v-model:selected="fileStore.key"
    @update:selected="onSelect"
  )
    template(v-slot:default-header="prop")
      tree-item(:node="prop.node")
</template>

<script setup>
import { useFileStore } from 'src/stores/file'
import TreeItem from 'src/components/TreeItem'

const fileStore = useFileStore()

const onSelect = id => {
  if (isFolder(id)) return
  fileStore.getFileContent(id)
}

const isFolder = id => !id || isNaN(id)
</script>

<style lang="sass" scoped>
#tree-file
  width: 250px
  height: calc(100vh - 28px)
  margin: 0px 17px 0px 0px
  border-radius: 10px
  overflow: scroll
  .q-tree
    width: auto
    overflow: scroll
    color: $dark-page
</style>

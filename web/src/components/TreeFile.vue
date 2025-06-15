<template lang="pug">
#tree-file.q-gutter-sm.bg-primary
  q-tree.cursor-pointer(
    :nodes="tree"
    dense
    node-key="label"
    no-connectors
    :default-expand-all="true"
    v-model:selected="fileStore.filename"
  )
    template(v-slot:default-header="prop")
      .row.items-center
        q-icon.q-mr-sm(
          v-if="prop.node.icon"
          :name="prop.node.icon"
          color="blue-grey-9"
          size="14px"
        )
        .text-white.text-body2(v-if="!isSelected(prop)")="{{ prop.node.label }}"
        q-chip.text-body2.selected-file.text-white.bg-blue-grey-10(
          v-else dense
        )="{{ prop.node.label }}"
        q-menu(touch-position :context-menu="true")
          q-list(style="min-width: 100px" dense)
            q-item(clickable v-close-popup)
              q-item-section="New file"
            q-item(clickable v-close-popup)
              q-item-section="Rename"
            q-item(clickable v-close-popup)
              q-item-section="Delete file"
</template>

<script setup>
import { useFileStore } from 'src/stores/file'

const fileStore = useFileStore()
const tree = fileStore.tree

const isSelected = prop => prop.node.label === fileStore.filename
</script>

<style lang="sass" scoped>
.selected-file
  margin: 0
  margin-left: -10px
  padding-left: 12px
  padding-right: 20px

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

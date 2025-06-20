<template lang="pug">
q-menu(touch-position :context-menu="true")
  q-list#menu-list(dense)
    q-item(
      v-if="isFolder()"
      @click="showNewForm()"
      clickable
      v-close-popup
    )
      q-item-section="New file"
    q-item(
      v-if="!isFolder()"
      @click="showNewForm(props.node)"
      clickable
      v-close-popup
    )
      q-item-section="Rename"
    q-item(
      @click="destroy"
      clickable
      v-close-popup
    )
      q-item-section="Delete file"
</template>

<script setup>
import { confirmAction } from 'src/lib/notification'
import { useFileStore } from 'src/stores/file'

const fileStore = useFileStore()
const props = defineProps(['node'])

const isFolder = () => !props.node.key || isNaN(props.node.key)

const showNewForm = () => {}

const destroy = () =>
  confirmAction(
    `Are you sure you want to delete ${props.node.label}?`,
    'The file will be totally removed from the system with no backup of any type.',
    () => fileStore.delete(props.node.key)
  )
</script>

<style lang="sass" scoped>
#menu-list
  min-width: 100px
</style>

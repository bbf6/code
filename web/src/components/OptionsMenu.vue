<template lang="pug">
q-menu(touch-position :context-menu="true")
  q-list#menu-list(dense)
    q-item(
      @click="showNewForm(props.node)"
      clickable
      v-close-popup
    )
      q-item-section="New file"
    q-item(
      v-if="!isFolder()"
      @click="showNewForm(props.node, false)"
      clickable
      v-close-popup
    )
      q-item-section="Rename"
    q-item(
      v-if="!isFolder()"
      @click="destroy"
      clickable
      v-close-popup
    )
      q-item-section="Delete file"
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { confirmAction } from 'src/lib/notification'
import { useFileStore } from 'src/stores/file'

const $q = useQuasar()
const fileStore = useFileStore()
const props = defineProps(['node'])
const filename = ref('')

const isFolder = () => !props.node.key || isNaN(props.node.key)

const getNodePath = (nodes, label, currentPath = []) => {
  for (const node of nodes) {
    const newPath = [...currentPath, node.label];
    if (node.label === label) return newPath
    if (node.children) {
      const foundPath = getNodePath(node.children, label, newPath)
      if (foundPath) return foundPath
    }
  }
  return null
}

const showNewForm = (file, isNew = true) => {
  filename.value = isNew ? '' : file.label
  $q.dialog({
    dark: true,
    title: 'Name of the file',
    message: '',
    prompt: {
      model: filename,
      type: 'text'
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    const path = getNodePath(fileStore.tree, file.label)
    if (!isFolder()) path.pop()
    const fullPath = `${path.join('/')}/${data}`
    if (isNew) return fileStore.create(fullPath)
    fileStore.rename(file.key, data)
  })
}

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

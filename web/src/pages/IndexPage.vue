<template lang="pug">
q-page.flex.flex-center(@keyup.ctrl.stop="onKeyPress")
  tree-file
  .column
    .row.justify-center
      q-chip.bg-primary="{{ fileStore.filename || 'No file selected' }}"
    code-editor
  q-page-sticky(position="bottom-right" :offset="[12, 12]")
    .column.q-gutter-sm
      q-btn(round color="primary" icon="content_copy")
      q-btn(round color="primary" icon="save" @click="fileStore.update()")
</template>

<script setup>
import { ref, onMounted } from 'vue'
import consumer from 'src/lib/cable'
import { useFileStore } from 'src/stores/file'
import TreeFile from 'src/components/TreeFile'
import CodeEditor from 'src/components/CodeEditor'

const fileStore = useFileStore()

const configCable = () =>
  consumer.subscriptions.create('CodeFileChannel', {
    connected: () => console.log('Connected to code_file_channel'),
    disconnected: () => console.log('Disconnected from code_file_channel'),
    received: data => {
      console.log('?????????????')
      console.log(data)
      if (['new', 'deleted'].includes(data.action)) return fileStore.getTree()
      if (data.action === 'edited') return /* check if the file open is this one and then refresh from api */
    }
  })

const onKeyPress = (e) => {
  // console.log('=============')
  // console.log(e)
  e.preventDefault = true
  if (e.key !== 's') return
  fileStore.update()
}

onMounted(() => {
  fileStore.getTree()
  configCable()
})
</script>

<style lang="sass" scoped>
.q-page
  padding-x: 0 !important
</style>

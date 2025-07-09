<template lang="pug">
q-page.flex.flex-center
  tree-file
  .column
    .row.justify-center
      q-chip.bg-primary="{{ fileStore.filename || 'No file selected' }}"
    code-editor
  q-page-sticky(position="bottom" :offset="[12, 12]" v-if="fileStore.readOnly")
    .row.q-gutter-sm
      q-chip(color="primary" text-color="white")
        q-spinner-dots.q-mr-md(color="white" size="2em")
        | Editing file
  q-page-sticky(position="bottom-right" :offset="[12, 12]")
    .column.q-gutter-sm
      q-btn(round color="primary" icon="content_copy" @click="copy")
      q-btn(round color="primary" icon="save" @click="fileStore.update()")
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useFileStore } from 'src/stores/file'
import { showOkAlert } from 'src/lib/notification'
import TreeFile from 'src/components/TreeFile'
import CodeEditor from 'src/components/CodeEditor'

const fileStore = useFileStore()

onMounted(() => {
  fileStore.getTree()
  fileStore.initializeSubscription()
})

onBeforeUnmount(() => {
  fileStore.cleanup()
})

setInterval(() => {
  if (!fileStore.key) return
  if (!fileStore.isTyping) return
  fileStore.send({ action: 'editing', file: fileStore.key })
}, 1000)

const copy = () => {
  navigator.clipboard.writeText(fileStore.fileContent)
  showOkAlert('Text copied to clipboard')
}
</script>

<style lang="sass" scoped>
.q-page
  padding-x: 0 !important
</style>

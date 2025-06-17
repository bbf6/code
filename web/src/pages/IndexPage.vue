<template lang="pug">
q-page.flex.flex-center
  tree-file
  .column
    .row.justify-center
      q-chip.bg-primary="{{ fileStore.filename || 'No file selected' }}"
    code-editor
  q-page-sticky(position="bottom-right" :offset="[12, 12]")
    .column.q-gutter-sm
      q-btn(round color="primary" icon="content_copy")
      q-btn(round color="primary" icon="save")
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFileStore } from 'src/stores/file'
import TreeFile from 'src/components/TreeFile'
import CodeEditor from 'src/components/CodeEditor'

const fileStore = useFileStore()

onMounted(fileStore.getTree)
</script>

<style lang="sass" scoped>
.q-page
  padding-x: 0 !important
</style>

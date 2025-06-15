<template lang="pug">
codemirror.editor(
  v-model="code"
  style="width: calc(100vw - 290px); height: calc(100vh - 50px)"
  :autofocus="true"
  :indent-with-tab="true"
  :extensions="extensions"
  @ready="handleReady"
  @change="log('change', $event)"
  @focus="log('focus', $event)"
  @blur="log('blur', $event)"
)
</template>

<script setup>
import { ref, shallowRef, defineComponent } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

const code = ref(`console.log('Hello, world!')`)
const extensions = [javascript(), oneDark]
const view = shallowRef()

const handleReady = (payload) => {
  view.value = payload.view
}

const log = console.log

const getCodemirrorStates = () => {
  const state = view.value.state
  const ranges = state.selection.ranges
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
  const cursor = ranges[0].anchor
  const length = state.doc.length
  const lines = state.doc.lines
}
</script>

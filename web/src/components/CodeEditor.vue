<template lang="pug">
codemirror.editor(
  v-model="fileStore.fileContent"
  style="width: calc(100vw - 290px); height: calc(100vh - 50px)"
  :autofocus="true"
  readOnly="nocursor"
  :indent-with-tab="true"
  :extensions="extensions"
  @ready="handleReady"
  @change="log('change', $event)"
)
</template>

<script setup>
import { ref, computed, shallowRef, defineComponent } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { angular } from '@codemirror/lang-angular'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { java } from '@codemirror/lang-java'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { markdown } from '@codemirror/lang-markdown'
import { php } from '@codemirror/lang-php'
import { python } from '@codemirror/lang-python'
import { sass } from '@codemirror/lang-sass'
import { sql } from '@codemirror/lang-sql'
import { vue } from '@codemirror/lang-vue'
import { yaml } from '@codemirror/lang-yaml'
import { oneDark } from '@codemirror/theme-one-dark'
import { useFileStore } from 'src/stores/file'

const fileStore = useFileStore()

const langs = {
  ts: angular(),
  css: css(),
  html: html(),
  java: java(),
  js: javascript(),
  json: json(),
  md: markdown(),
  php: php(),
  py: python(),
  sass: sass(),
  sql: sql(),
  vue: vue(),
  yaml: yaml()
}

const getLang = () => langs[fileStore.fileExtension]

const extensions = computed(() => {
  const lang = getLang()
  if (!lang) return [oneDark]
  return [oneDark, lang]
})
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

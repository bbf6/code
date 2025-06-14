<template lang="pug">
q-layout(view="lHh lpR lFf")
  q-header.bg-primary.text-white(reveal bordered)
    q-toolbar
      q-btn(dense flat round icon="menu" @click="toggleLeftDrawer")
      q-toolbar-title
        q-avatar
          img(src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg")
        | Title
  q-drawer(show-if-above v-model="leftDrawerOpen" side="left" bordered)
    <!-- drawer content -->
  q-page-container
    router-view
  q-footer.bg-grey-8.text-white(reveal bordered)
    q-toolbar
      q-toolbar-title
        q-avatar
          img(src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg")
        div="Title"
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(true)

const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value
</script>

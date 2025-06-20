<template lang="pug">
.row.items-center
  q-icon.q-mr-sm(
    v-if="props.node.icon"
    :name="props.node.icon"
    color="blue-grey-9"
    size="14px"
  )
  .text-white.text-body2(v-if="!isSelected()")="{{ props.node.label }}"
  q-chip.text-body2.selected-file.text-white.bg-blue-grey-10(
    v-else dense
  )="{{ props.node.label }}"
  options-menu(:node="props.node")
</template>

<script setup>
import { useFileStore } from 'src/stores/file'
import OptionsMenu from 'src/components/OptionsMenu'

const fileStore = useFileStore()
const props = defineProps(['node'])

const isSelected = () => {
  if (isNaN(props.node.key)) return false
  return props.node.key === fileStore.key
}
</script>

<style lang="sass" scoped>
.selected-file
  margin: 0
  margin-left: -10px
  padding-left: 12px
  padding-right: 20px
</style>

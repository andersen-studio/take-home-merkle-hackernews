<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    storyIds: {
      type: Object as PropType<number[]>,
      required: false,
      default: []
    },
  },
  created() {
  }
})
</script>
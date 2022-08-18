<template>
  <div class="card">
    <div class="card-header">
      <p>{{ headerText }}</p>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  headerText: {
    type: String,
    required: true,
  },
})
</script>

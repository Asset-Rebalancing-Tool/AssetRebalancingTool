<template>
  <div class="input-wrapper">
    <input :type="inputType" :value="inputValue" />
    <label>{{ unit }}</label>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    inputType: {
      type: String,
      default: 'text',
    },
    inputValue: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    }
  })
</script>

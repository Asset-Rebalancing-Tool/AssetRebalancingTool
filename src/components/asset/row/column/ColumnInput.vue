<template>
  <div class="input-wrapper">
    <input :type="props.inputType" :value="props.inputValue" />
    <label>{{ props.unit }}</label>
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
  },
})
</script>

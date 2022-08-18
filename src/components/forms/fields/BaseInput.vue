<template>
  <label v-if="label">{{ label }}</label>
  <input
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="label"
      @input="$emit('update:modelValue', $event.target.value)"
      class="field"
  >
</template>

<script setup>
const props = defineProps({
  label: {
    type: 'String',
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
})
</script>

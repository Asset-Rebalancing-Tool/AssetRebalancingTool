<template>
  <label class="checkbox-wrapper"><span>{{ label }}</span>
    <input type="checkbox"
           :checked="modelValue"
           @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkmark"></span>
  </label>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
})
</script>

<style lang="scss">
</style>

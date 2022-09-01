<template>
  <slot name="label"></slot>
  <div class="input-container">
    <div class="input-wrapper">
      <input
        v-bind="$attrs"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <slot name="inputIcon"></slot>
    </div>
    <slot name="unit"></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  placeholder: {
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
.input-container {
  @include flex-center-xy;
  column-gap: $medium-column-gap;
  width: 100%;
  height: 100%;
}

.input-wrapper {
  width: 100%;
}

.input-container.locked {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>

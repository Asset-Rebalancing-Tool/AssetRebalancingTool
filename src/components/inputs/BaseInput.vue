<template>
  <slot name="label"></slot>
  <div class="input-container" :class="customContainerClass">
    <div class="input-wrapper">
      <input
        v-bind="$attrs"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        @click="focusSelect($event.target)"
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
  customContainerClass: {
    type: String,
    required: false,
  },
  selectOnFocus: {
    type: Boolean,
    default: true,
  },
})

// Select the input value on value focus if selectOnFocus bool is true
function focusSelect(target: { select: () => void }): void {
  if (props.selectOnFocus) target.select()
}
</script>

<style lang="scss">
.input-container {
  @include flex-center-xy;
  column-gap: $small-column-gap;
  width: 100%;
  height: 100%;
}

.input-container.quantity-input {
  width: calc(100% + 58px);
  margin-left: -29px;
  //margin: 0 -29px;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-container.locked {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>

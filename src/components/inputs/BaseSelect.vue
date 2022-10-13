<template>
  <div class="select-container">
    <select
      :value="selectedValue"
      v-bind="{
        ...$attrs,
        onChange: ($event) => {
          $emit('update:modelValue', $event.target.value)
        },
      }"
    >
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
        :selected="option.value === modelValue"
      >
        {{ option.text }}
      </option>
    </select>

    <slot name="icon">
      <IconSelectArrow />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import IconSelectArrow from '@/assets/icons/inputs/IconSelectArrow.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: true,
  },
  defaultSelection: {
    type: String,
    required: false,
  },
  options: {
    type: Object,
    required: true,
  },
})

const selectedValue = computed(() => {
  //return props.defaultSelection ? props.defaultSelection : props.modelValue
  return props.modelValue ? props.modelValue : props.defaultSelection
})
</script>

<style lang="scss">
.select-container {
  position: relative;

  select.currency {
    width: 60px;
  }
  select.quantity {
    width: 85px;
  }

  svg {
    @include absolute-right-center-y;
    transform: translate(0, -50%);
    right: 6px;
    width: 16px;
    height: 16px;
    pointer-events: none;
  }
}

.select-container.price {
  min-width: 90px;
}
</style>

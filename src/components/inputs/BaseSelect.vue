<template>
  <div class="select-container">
    <select
      :value="selectedValue"
      v-bind="{
        ...$attrs,
        onClick: () => setSelectArrow('open'),
        onBlur: () => setSelectArrow('blur'),
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
      <IconSelectArrow :select-is-open="selectIsOpen" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import IconSelectArrow from '@/assets/icons/inputs/IconSelectArrow.vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
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

const selectIsOpen: Ref<boolean> = ref(false)

const selectedValue = computed(() => {
  //return props.defaultSelection ? props.defaultSelection : props.modelValue
  return props.modelValue ? props.modelValue : props.defaultSelection
})

function setSelectArrow(action: string) {
  switch (action) {
    case 'open':
      selectIsOpen.value = !selectIsOpen.value
      break
    case 'blur':
      selectIsOpen.value = false
      break
  }
}
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
    width: 8px;
    height: 8px;
    top: calc(50% + 1px);
    pointer-events: none;
  }
}

.select-container.price {
  min-width: 90px;
}
</style>

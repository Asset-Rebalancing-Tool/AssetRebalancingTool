<template>
  <select
      class="field"
      :value="selectedValue"
      v-bind="{
      ...$attrs,
      onChange: ($event) => { $emit('update:modelValue', $event.target.value) }
    }"
  >
    <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === modelValue"
    >{{ option }}</option>
  </select>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { CurrencyEnum } from "@/models/enums/CurrencyEnum";
import type { CurrencyEnum as CurrencyType } from "@/models/enums/CurrencyEnum";
import type { UnitTypeEnum } from "@/models/enums/UnitTypeEnum";
import {computed} from "vue";

const props = defineProps({
  modelValue: {
    type: String as PropType<CurrencyType | UnitTypeEnum>,
    default: true
  },
  defaultSelection: {
    type: String as PropType<CurrencyType | UnitTypeEnum>,
    required: false
  },
  options: {
    type: Array,
    required: true
  }
})

const selectedValue = computed(() => {
  return (props.defaultSelection) ? props.defaultSelection : props.modelValue
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

<template>
  <div class="input-wrapper">
    <input :type="inputType" :value="inputValue" />
    <label>{{ unit }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ColumnInput',
  props: {
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
  },
})
</script>

<style lang="scss" scoped></style>

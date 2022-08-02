<template>
  <div class="wrapper">
    <input :type="inputType" :value="inputValue" />
    <label>{{ unit }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TargetPercentageColumn',
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

<style lang="scss" scoped>
.wrapper {
  width: 115px;
  height: $asset-row-height;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
}

.wrapper input {
  width: 80px;
}
</style>

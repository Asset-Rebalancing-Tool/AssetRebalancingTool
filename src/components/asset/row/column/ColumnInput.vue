<template>
  <div class="wrapper">
    <input :type="inputType" :value="inputValue"/>
    <label>{{unit}}</label>
  </div>
</template>

<script>
export default {
  name: 'TargetPercentageColumn',
  props: {
    inputType: {
      type: Array,
      required: true
    },
    inputValue: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>
  .wrapper {
    width: 115px;
    height: var(--asset-row-height);
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
  }

  .wrapper input {
    width: 80px;
  }

</style>
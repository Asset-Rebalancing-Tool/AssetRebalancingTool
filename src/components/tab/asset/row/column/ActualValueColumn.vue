<template>
  <div class="wrapper">
    <span>{{actualValue}} {{currency}}</span>
    <span>{{actualPercentage}} {{currency}}</span>
  </div>
</template>

<script>
export default {
  name: 'ActualValueColumn',
  props: [
      'actualValue',
      'actualPercentage',
      'currency'
  ],
}
</script>

<style scoped>
  .wrapper {
    width: 80px;
    height: var(--asset-row-height);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .wrapper span {
    text-align: right!important;
  }
</style>
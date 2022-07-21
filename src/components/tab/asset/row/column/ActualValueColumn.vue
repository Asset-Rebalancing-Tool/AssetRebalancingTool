<template>
  <div class="actual-value-wrapper">
    <span>{{value}} €</span>
    <span>{{percentage}} %</span>
  </div>
</template>

<script>
export default {
  name: 'ActualValueColumn',
  props: [
      'value',
      'percentage',
  ],
}
</script>

<style scoped>
  .actual-value-wrapper {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    row-gap: 2px;
  }

  .actual-value-wrapper span {
    height: 18px;
    line-height: 18px;
    font-size: 14px;
    color: var(--primary-text-color);
  }
</style>
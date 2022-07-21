<template>
  <div class="actual-value-wrapper">
    <span class="currency">{{value}} €</span>
    <span class="percentage">{{percentage}} %</span>
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
    width: 200px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 50px;
  }

  .actual-value-wrapper .currency,
  .actual-value-wrapper .percentage {
    height: 18px;
    line-height: 18px;
    font-size: 15px;
    font-weight: 600;
    text-align: right;
    color: var(--primary-text-color);
  }

  .actual-value-wrapper .currency {
    width: 90px;
  }

  .actual-value-wrapper .percentage {
    width: 65px;
  }
</style>
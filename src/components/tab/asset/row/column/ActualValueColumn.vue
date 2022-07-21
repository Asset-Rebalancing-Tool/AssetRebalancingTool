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
    width: 200px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 40px;
  }

  .actual-value-wrapper span {
    height: 18px;
    line-height: 18px;
    font-size: 15px;
    font-weight: 600;
    color: var(--primary-text-color);
  }
</style>
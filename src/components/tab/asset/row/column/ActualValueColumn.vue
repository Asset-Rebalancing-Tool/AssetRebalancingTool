<template>
  <div class="actual-value-wrapper">
    <label>{{actualValue}} {{currency}}</label>
    <label>{{actualPercentage}} {{currency}}</label>
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

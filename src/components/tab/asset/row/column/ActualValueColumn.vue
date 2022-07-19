<template>
  <div class="actual-value-wrapper">
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

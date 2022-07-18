<template>
  <div class="actual-value-wrapper">
    <label>{{asset.actualValue}} {{asset.currency}}</label>
    <label>{{asset.actualPercentage}} {{asset.currency}}</label>
  </div>
</template>

<script>
export default {
  name: 'AssetActualValueColumn',
  props: [
      'asset'
  ],
}
</script>

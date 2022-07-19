<template>
  <div class="target-percentage-wrapper">
    <input type="text" :value="asset.targetPercentage"/>
    <label>%</label>
  </div>
</template>

<script>
export default {
  name: 'TargetPercentageColumn',
  props: [
      'asset'
  ]
}
</script>

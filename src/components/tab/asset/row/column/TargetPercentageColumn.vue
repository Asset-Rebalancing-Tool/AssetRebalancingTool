<template>
  <div class="target-percentage-wrapper">
    <input type="text" :value="targetPercentage"/>
    <label>%</label>
  </div>
</template>

<script>
export default {
  name: 'TargetPercentageColumn',
  props: [
      'targetPercentage'
  ]
}
</script>

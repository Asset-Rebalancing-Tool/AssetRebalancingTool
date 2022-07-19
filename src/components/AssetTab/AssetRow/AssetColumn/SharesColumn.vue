<template>
  <div class="shares-wrapper">
    <input type="text" :value="asset.shares"/>
    <label>{{asset.sharesType}}</label>
  </div>
</template>

<script>
export default {
  name: 'SharesColumn',
  props: [
      'asset'
  ]
}
</script>

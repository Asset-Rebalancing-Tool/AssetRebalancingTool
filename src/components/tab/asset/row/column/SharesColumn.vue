<template>
  <div class="shares-wrapper">
    <input type="text" :value="shares"/>
    <label>{{sharesType}}</label>
  </div>
</template>

<script>
export default {
  name: 'SharesColumn',
  props: [
      'shares',
      'sharesType'
  ]
}
</script>

<style>
  @import "src/assets/css/tab/asset/row/column/shares-column.css";
</style>
<template>
  <div class="wrapper">
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

<style scoped>
  .wrapper {
    width: 115px;
    height: var(--asset-row-height);
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
  }

  .wrapper input {
    width: 80px;
  }

  .wrapper label {
    font-weight: 600;
  }
</style>
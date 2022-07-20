<template>
  <label>
    <input class="searchbar" type="text" placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)">
    <span class="icon searchbar"></span>
  </label>
</template>

<script>
export default {
  name: 'AssetSearchbar',
}
</script>

<style>
  @import "src/assets/css/tab/asset/searchbar.css";
</style>
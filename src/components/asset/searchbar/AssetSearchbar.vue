<template>
  <label>
    <input type="text" placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)">
    <span class="icon"></span>
  </label>
</template>

<script>
export default {
  name: 'AssetSearchbar',
}
</script>

<style scoped>
  .icon {
    position: absolute;
    width: 18px;
    height: 18px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
    background-image: var(--icon-searchbar);
    opacity: 0.6;
  }
</style>
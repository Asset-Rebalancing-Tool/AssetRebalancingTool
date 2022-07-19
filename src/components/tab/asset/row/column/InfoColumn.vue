<template>
  <div class="asset-info-wrapper">
    <div class="asset-image" :class="activeAsset"></div>
    <div class="asset-name-wrapper">
      <p class="asset-name">{{name}}</p>
      <div class="asset-info-row">
        <div class="asset-type">{{type}}</div>
        <span class="isin label">ISIN</span>
        <span class="isin">{{isin}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoColumn',
  props: [
      'isSelected',
      'name',
      'type',
      'isin',
  ],
  computed: {
    activeAsset() {
      return (this.isSelected) ? 'selected' : ''
    }
  }
}
</script>

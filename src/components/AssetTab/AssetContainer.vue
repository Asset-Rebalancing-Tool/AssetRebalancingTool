<template>
  <div class="asset-container">
    <div class="asset-image" :class="(asset.isSelected) ? 'selected' : ''"></div>
    <div class="asset-info">
      <span class="asset-name">{{asset.name}}</span>
      <div class="asset-info-row">
        <div class="asset-type">{{asset.type}}</div>
        <span class="isin label">ISIN</span>
        <span class="isin">{{asset.isin}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssetContainer',
  props: [
      'asset'
  ],
  methods: {
    formatAssetShares(shares) {
      this.asset.shares = 'Test'
    }
  }
}
</script>

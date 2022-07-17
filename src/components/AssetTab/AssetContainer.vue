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

    <div class="asset-price-wrapper">
      <span class="primary-asset-price">{{asset.formattedStockPrice[0]}}</span>
      <span class="secondary-price-wrapper">
         <span class="decimal-wrapper">
           <span class="secondary-asset-price">{{asset.formattedStockPrice[1]}}</span>
           <span class="tertiary-asset-price">{{asset.formattedStockPrice[2]}}</span>
         </span>
         <span class="asset-price-currency">{{asset.currency}}</span>
      </span>
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

<template>
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
</template>

<script>
export default {
  name: 'AssetPriceColumn',
  props: [
      'asset'
  ]
}
</script>

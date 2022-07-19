<template>
  <div class="asset-price-wrapper">
    <span class="primary-asset-price">{{beforeDecimal}}</span>
    <span class="secondary-price-wrapper">
         <span class="decimal-wrapper">
           <span class="secondary-asset-price">{{firstDecimal}}</span>
           <span class="tertiary-asset-price">{{secondDecimal}}</span>
         </span>
         <span class="asset-price-currency">{{currency}}</span>
      </span>
  </div>
</template>

<script>
export default {
  name: 'PriceColumn',
  props: [
      'formattedStockPrice',
      'currency'
  ],
  computed: {
    beforeDecimal() {
      return this.formattedStockPrice[0];
    },
    firstDecimal() {
      return this.formattedStockPrice[1];
    },
    secondDecimal() {
      return this.formattedStockPrice[2];
    }
  }
}
</script>

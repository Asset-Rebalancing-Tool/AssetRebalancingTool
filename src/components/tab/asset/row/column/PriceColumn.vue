<template>
  <div class="price-wrapper">
    <span class="primary-price">{{beforeDecimal}}</span>
    <span class="secondary-wrapper">
         <span class="decimal-wrapper">
           <span class="secondary-price">{{firstDecimal}}</span>
           <span class="tertiary-price">{{secondDecimal}}</span>
         </span>
         <span class="currency">{{currency}}</span>
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

<style scoped>
.price-wrapper {
  width: 52px;
  height: var(--asset-row-height);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -5px;
}

.primary-price {
  color: var(--primary-text-color);
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
}

.secondary-price {
  height: 14px;
  color: var(--secondary-text-color);
  font-size: 13px;
  margin-left: 3px;
}

.decimal-wrapper {
  display: flex;
}

.tertiary-price {
  height: 10px;
  color: var(--tertiary-text-color);
  font-size: 13px;
}

.currency {
  height: 12px;
  color: var(--primary-text-color);
  font-size: 14px;
  margin-left: 3px;
}
</style>
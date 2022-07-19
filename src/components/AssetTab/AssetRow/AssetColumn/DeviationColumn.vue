<template>
  <div class="asset-deviation-wrapper">
    <span class="primary-asset-deviation">{{beforeDecimal}}</span>
    <span class="secondary-deviation-wrapper">
         <span class="decimal-wrapper">
           <span class="secondary-asset-deviation">{{firstDecimal}}</span>
           <span class="tertiary-asset-deviation">{{secondDecimal}}</span>
         </span>
         <span class="asset-deviation-unit">%</span>
      </span>
  </div>
</template>

<script>
export default {
  name: 'DeviationColumn',
  props: [
      'formattedDeviation'
  ],
  computed: {
    beforeDecimal() {
      return this.formattedDeviation[0];
    },
    firstDecimal() {
      return this.formattedDeviation[1];
    },
    secondDecimal() {
      return this.formattedDeviation[2];
    }
  }
}
</script>

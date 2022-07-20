<template>
  <div class="deviation-wrapper">
    <span class="primary-deviation">{{beforeDecimal}}</span>
    <span class="secondary-deviation">
         <span class="decimal-wrapper">
           <span class="secondary-deviation">{{firstDecimal}}</span>
           <span class="tertiary-deviation">{{secondDecimal}}</span>
         </span>
         <span class="unit">{{unit}}</span>
      </span>
  </div>
</template>

<script>
export default {
  name: 'DeviationColumn',
  props: [
      'formattedDeviation',
      'unit'
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

<style scoped>
.deviation-wrapper {
  width: 52px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.primary-deviation {
  color: var(--primary-text-color);
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
}

.secondary-deviation {
  height: 14px;
  color: var(--secondary-text-color);
  font-size: 13px;
  margin-left: 3px;
}

.decimal-wrapper {
  display: flex;
}

.tertiary-deviation {
  height: 10px;
  color: var(--tertiary-text-color);
  font-size: 13px;
}

.unit {
  height: 12px;
  color: var(--primary-text-color);
  font-size: 14px;
  margin-left: 3px;
}
</style>
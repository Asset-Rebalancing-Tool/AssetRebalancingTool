<template>
  <div class="single-value-wrapper">
    <span class="first-digit">{{firstDigit}}</span>
    <span>
       <span class="decimal-wrapper">
         <span class="first-decimal">{{firstDecimal}}</span>
         <span class="second-decimal">{{secondDecimal}}</span>
       </span>
       <span class="unit">{{unit}}</span>
    </span>
  </div>
</template>

<script>

export default {
  name: 'valueColumn',
  props: [
      'valueArray',
      'unit'
  ],
  computed: {
    firstDigit() {
      console.log(this.valueArray)
      return this.valueArray[0];
    },
    firstDecimal() {
      return this.valueArray[1];
    },
    secondDecimal() {
      return this.valueArray[2];
    }
  }
}
</script>

<style scoped>
.single-value-wrapper {
  width: 52px;
  display: flex;
  justify-content: center;
  margin-top: 11px;
}

.first-digit {
  color: var(--primary-text-color);
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
}

.first-decimal {
  height: 14px;
  color: var(--secondary-text-color);
  font-size: 13px;
  margin-left: 3px;
}

.decimal-wrapper {
  display: flex;
}

.second-decimal {
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
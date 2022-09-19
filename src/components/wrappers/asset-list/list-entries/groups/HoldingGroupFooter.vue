<template>
  <footer>

    <div class="footer-header">
      <button class="plus">+</button>
      <button class="minus">-</button>
      <h4>Meine Gruppe 1</h4>
    </div>


    <!-- empty columns -->
    <span></span>
    <span></span>

    <div class="current-value-wrapper">
      <p>10.642,59 €</p>
      <p>66,84 %</p>
    </div>

    <BaseInput ref="footerInput">
      <template #unit>
        <span>%</span>
      </template>
    </BaseInput>

    <ThreeDigitValue :value-array="testDeviation" :unit="'%'">
      <template #arrow>
        <IconAssetRowArrow />
      </template>
    </ThreeDigitValue>
  </footer>
</template>

<script lang="ts" setup>
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'

const testDeviation = ['08', '16', '0']
</script>

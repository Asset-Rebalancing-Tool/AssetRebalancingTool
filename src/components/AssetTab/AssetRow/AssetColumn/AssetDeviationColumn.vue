<template>
  <div class="asset-deviation-wrapper">
    <span class="primary-asset-deviation">{{asset.formattedDeviation[0]}}</span>
    <span class="secondary-deviation-wrapper">
         <span class="decimal-wrapper">
           <span class="secondary-asset-deviation">{{asset.formattedDeviation[1]}}</span>
           <span class="tertiary-asset-deviation">{{asset.formattedDeviation[2]}}</span>
         </span>
         <span class="asset-deviation-currency">{{asset.currency}}</span>
      </span>
  </div>
</template>

<script>
export default {
  name: 'AssetDeviationColumn',
  props: [
      'asset'
  ]
}
</script>

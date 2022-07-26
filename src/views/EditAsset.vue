<template>
  <div>
    {{asset}}
  </div>
</template>

<script>
import AssetService from '@/services/AssetService.js'

export default {
  name: 'EditAsset',
  props: {
    assetId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      asset: null
    }
  },
  created() {
    AssetService.getAsset(this.id).then(response => {
        this.asset = response.data
    }).catch(error => {
        console.log(error)
    })
  }
}
</script>
<template>
  <div>
    {{assetGroup}}
  </div>
</template>

<script>
import AssetService from '@/services/AssetService.js'

export default {
  name: 'EditAssetGroup',
  props: {
    groupId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      assetGroup: null
    }
  },
  created() {
    AssetService.getAssetGroup(this.groupId).then(response => {
        this.assetGroup = response.data
    }).catch(error => {
        console.log(error)
    })
  }
}
</script>
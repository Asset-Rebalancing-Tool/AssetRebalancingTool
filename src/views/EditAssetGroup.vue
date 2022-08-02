<template>
  <div>
    {{ assetGroup }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EditAssetGroup',
  data() {
    return {
      assetGroup: null,
    }
  },
})
</script>

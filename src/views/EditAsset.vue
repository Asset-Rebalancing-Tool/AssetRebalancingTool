<template>
  <div>
    {{asset}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EditAsset',
  data() {
    return {
      asset: null
    }
  }
})
</script>

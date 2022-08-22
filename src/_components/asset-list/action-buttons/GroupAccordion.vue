<template>
  <div
    class="group-wrapper"
    @click="assetStore.moveAction(thisGroup.uuid)"
  >
    <div class="group-header">
      <div class="icon group"></div>
      <p>{{ thisGroup.name }}</p>
    </div>
    <ul>
      <slot>
        <li
          v-for="asset in relatedAssets"
          :key="asset.uuid"
          :class="{ selected: asset.isSelected }"
        >
          {{ asset.name }}
        </li>
      </slot>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'

const assetStore = useAssetStore()

const props = defineProps({
  thisGroup: {
    type: Object,
    required: true,
  },
})

// Get an object of all assets, that are nested in that group
const relatedAssets = computed(() => {
  return assetStore.getAssetsByGroupUuid(props.thisGroup.uuid)
})
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/components/asset/context-menu/group-accordion.scss';
</style>

<template>
  <div class="group-wrapper" @click="assetStore.moveAction(thisGroup.uuid)">
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

<script lang="ts">
import { defineComponent } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import type { PropType } from 'vue'
import type { IOwnedPublicAssets } from '@/models/old/IOwnedPublicAssets'
import type { IOwnedPrivateGroup } from '@/models/old/IOwnedPrivateGroup'

export default defineComponent({
  name: 'GroupAccordion',
  props: {
    thisGroup: {
      type: Object as PropType<IOwnedPrivateGroup>,
      required: true,
    },
  },
  computed: {
    // Get an object of all assets, that are nested in that group
    relatedAssets(): IOwnedPublicAssets {
      return this.assetStore.getAssetsByGroupUuid(this.thisGroup.uuid)
    },
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore,
    }
  },
})
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/components/asset/context-menu/group-accordion.scss";
</style>

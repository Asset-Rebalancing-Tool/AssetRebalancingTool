<template>
  <section id="asset-list">
    <header>
      <AssetSearchbar />
      <ActionButtons />
    </header>

    <TableFilters />

    <div class="asset-container">
      <AssetGroup
        v-for="group in assetStore.ownedGroups"
        :key="group.uuid"
        :this-group="group"
      />

      <AssetRow
        v-for="asset in singleAssets"
        :key="asset.uuid"
        :this-asset="asset"
        @click="
          assetStore.toggleIsSelectedFlag(asset.uuid, asset.relatedGroupUuid)
        "
      />
    </div>

    <AssetListFooter />
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import AssetSearchbar from '../components/asset-list/searchbar/SearchbarInput.vue'
import ActionButtons from '../components/asset-list/action-buttons/ActionButtons.vue'
import TableFilters from '../components/asset-list/TableFilters.vue'
import AssetGroup from '../components/asset-list/group/AssetGroup.vue'
import AssetRow from '../components/asset-list/row/AssetRow.vue'
import AssetListFooter from '../components/asset-list/AssetListFooter.vue'

const assetStore = useAssetStore()

// Set the selected flag of an asset
const singleAssets = computed(() => {
  return assetStore.getAssetsWithoutGroup()
})
</script>

<!-- not scoped ! -->
<style lang="scss">
@import 'src/assets/scss/components/asset/group/_asset-group.scss';
</style>

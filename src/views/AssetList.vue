<template>
  <section id="asset-list">
    <header>
      <AssetSearchbar />
      <ActionButtons />
    </header>

    <TableFilters />

    <AssetGroup
      v-for="group in assetStore.ownedGroups"
      :key="group.uuid"
      :thisGroup="group"
    />

    <AssetRow
      v-for="asset in singleAssets"
      :key="asset.uuid"
      :thisAsset="asset"
      @click="
        assetStore.toggleIsSelectedFlag(asset.uuid, asset.relatedGroupUuid)
      "
    />

    <AssetListFooter />
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import AssetSearchbar from '../components/asset/searchbar/SearchbarInput.vue'
import ActionButtons from '../components/asset/action-buttons/ActionButtons.vue'
import TableFilters from '../components/asset/TableFilters.vue'
import AssetGroup from '../components/asset/group/AssetGroup.vue'
import AssetRow from '../components/asset/row/AssetRow.vue'
import AssetListFooter from '../components/asset/AssetListFooter.vue'

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

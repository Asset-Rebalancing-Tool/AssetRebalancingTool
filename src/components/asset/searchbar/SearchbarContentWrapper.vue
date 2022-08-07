<template>
  <div
    class="searchbar-content-wrapper"
    :class="{ active: assetStore.activeModalUnderlay }"
  >
    <div class="searchbar-label-grid">
      <p>Ergebnisse ({{ fetchedAssets.length }})</p>
    </div>

    <SearchbarAsset
      v-for="asset in fetchedAssets"
      :key="asset.uuid"
      :thisAsset="asset"
    />

    <div class="divider"></div>

    <div class="searchbar-content-footer">
      <div class="footer-info">
        <p>Ist dein Asset nicht dabei?</p>
        <p>
          Erstelle eigene Assets oder Gruppen, um dein Portfolio vollumfänglich
          abzubilden.
        </p>
      </div>
      <div class="button-wrapper">
        <button><span class="icon"></span>Asset erstellen</button>
        <button><span class="icon"></span>Gruppe anlegen</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import SearchbarAsset from '@/components/asset/searchbar/SearchbarAsset.vue'
import type { IOwnedPublicAssets } from '@/models/old/IOwnedPublicAssets'

export default defineComponent({
  name: 'SearchbarContentWrapper',
  components: {
    SearchbarAsset,
  },
  props: {
    fetchedAssets: {
      type: Array,
      required: true
    }
  },
  computed: {
    singleAssets(): IOwnedPublicAssets {
      return this.assetStore.getAssetsWithoutGroup()
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

<!-- not scoped -->
<style lang="scss">
@import 'src/assets/scss/components/asset/searchbar/searchbar-content-wrapper.scss';
</style>

<template>
  <label>
    <input
      type="text"
      placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)"
      @focusin="showModalUnderlay"
      @focusout="hideModalUnderlay"
      @keyup="fetchPublicAssets($event)"
    />
    <span class="icon"></span>
    <SearchbarContentWrapper :fetchedAssets="assets" />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import SearchbarContentWrapper from './SearchbarContentWrapper.vue'
import AssetService from '@/services/AssetService'

export default defineComponent({
  name: 'AssetSearchbar',
  components: {
    SearchbarContentWrapper,
  },
  data() {
    return {
      assets: [],
    }
  },
  methods: {
    showModalUnderlay(): void {
      this.assetStore.activeModalUnderlay = true
    },
    hideModalUnderlay(): void {
      this.assetStore.activeModalUnderlay = false
    },
    async fetchPublicAssets(event: Event) {
      this.assets = AssetService.searchAsset(event.target)
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
@import 'src/assets/scss/components/asset/searchbar/searchbar-input.scss';
</style>

<template>
  <label>
    <input
        type="text"
        placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)"
        @focusin="showModalUnderlay"
        @focusout="hideModalUnderlay"
    >
    <span class="icon"></span>
    <SearchbarWrapper />
  </label>
</template>

<script>
import {useAssetStore} from '@/stores/AssetStore';
import SearchbarWrapper from '@/components/asset/searchbar/SearchbarWrapper';

export default {
  name: 'AssetSearchbar',
  components: {
    SearchbarWrapper
  },
  methods: {
    showModalUnderlay() {
      this.assetStore.activeModalUnderlay = true
    },
    hideModalUnderlay() {
      this.assetStore.activeModalUnderlay = false
    }
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore
    }
  }
}
</script>

<style scoped>
  .icon {
    position: absolute;
    width: 18px;
    height: 18px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    top: 18px;
    right: 25px;
    background-image: var(--icon-searchbar);
    opacity: 0.6;
  }

  label {
    position: relative;
    z-index: 20;
  }
</style>
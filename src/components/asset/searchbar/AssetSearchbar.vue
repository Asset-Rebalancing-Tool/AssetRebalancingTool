<template>
  <label>
    <input
        type="text"
        placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)"
        @focusin="showModalUnderlay"
        @focusout="hideModalUnderlay"
    >
    <span class="icon"></span>
  </label>
</template>

<script>
import {useAssetStore} from '@/stores/AssetStore';

export default {
  name: 'AssetSearchbar',
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
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
    background-image: var(--icon-searchbar);
    opacity: 0.6;
  }

  label {
    z-index: 20;
  }
</style>
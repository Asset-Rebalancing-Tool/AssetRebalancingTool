<template>
  <label>
    <input
      type="text"
      placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)"
      @focusin="showModalUnderlay"
      @focusout="hideModalUnderlay"
    />
    <span class="icon"></span>
    <SearchbarContentWrapper />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import SearchbarContentWrapper from './SearchbarContentWrapper.vue'

export default defineComponent({
  name: 'AssetSearchbar',
  components: {
    SearchbarContentWrapper,
  },
  methods: {
    showModalUnderlay(): void {
      this.assetStore.activeModalUnderlay = true
    },
    hideModalUnderlay(): void {
      this.assetStore.activeModalUnderlay = false
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

input {
  text-align: left;
  padding: 25px;
}

label {
  position: relative;
  z-index: 20;
}

.icon {
  position: absolute;
  width: 18px;
  height: 18px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  top: 18px;
  right: 25px;
  background-image: $icon-searchbar;
  opacity: 0.6;
}
</style>

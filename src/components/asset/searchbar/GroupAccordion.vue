<template>
  <div class="group-wrapper">
    <div class="group-header">
      <div class="icon group"></div>
      <p>{{thisGroup.name}}</p>
    </div>
    <ul>
      <slot>
        <li v-for="asset in relatedAssets"
            :key="asset.id"
            :class="{'selected': asset.isSelected}"
        >{{asset.name}}</li>
      </slot>
    </ul>
  </div>
</template>

<script>
import {useAssetStore} from '@/stores/AssetStore';

export default {
  name: 'GroupAccordion',
  props: {
    thisGroup: {
      type: Object,
      required: true
    }
  },
  computed: {
    // Get an object of all assets, that are nested in that group
    relatedAssets() {
      return this.assetStore.getAssetsByGroupId(this.thisGroup.id)
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
  .group-wrapper {
    width: 100%;
    padding: 15px 15px 10px;
    cursor: pointer;
  }

  .group-wrapper:hover {
    background-color: var(--secondary-background-color);
  }

  .group-header {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
</style>
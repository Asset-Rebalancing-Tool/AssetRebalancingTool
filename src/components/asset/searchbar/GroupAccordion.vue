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

  p {
    color: var(--primary-text-color);
    font-size: 18px;
    line-height: 22px;
    margin-top: 2px;
  }

  .icon {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .icon.group {
    width: 18px;
    height: 18px;
    background-image: var(--icon-group-action);
  }

  ul {
    padding-left: 24px;
    margin: 5px 0 10px;
  }

  li {
    height: 26px;
    line-height: 26px;
    color: var(--primary-text-color);
  }

  li::marker {
    font-size: 22px;
  }

  li.selected {
    color: var(--main-color);
  }
</style>
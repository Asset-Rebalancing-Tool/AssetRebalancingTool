<template>
  <div class="group-wrapper" @click="assetStore.moveAction(thisGroup.uuid)">
    <div class="group-header">
      <div class="icon group"></div>
      <p>{{thisGroup.name}}</p>
    </div>
    <ul>
      <slot>
        <li v-for="asset in relatedAssets"
            :key="asset.uuid"
            :class="{'selected': asset.isSelected}"
        >{{asset.name}}</li>
      </slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAssetStore } from '@/stores/AssetStore';
import type { PropType } from "vue";
import type { IOwnedPublicAssets } from "@/models/IOwnedPublicAssets";
import type { IOwnedPrivateGroup } from "@/models/IOwnedPrivateGroup";

export default defineComponent({
  name: 'GroupAccordion',
  props: {
    thisGroup: {
      type: Object as PropType<IOwnedPrivateGroup>,
      required: true
    }
  },
  computed: {
    // Get an object of all assets, that are nested in that group
    relatedAssets(): IOwnedPublicAssets {
      return this.assetStore.getAssetsByGroupUuid(this.thisGroup.uuid)
    }
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore
    }
  }
})
</script>

<style lang="scss" scoped>
  .group-wrapper {
    width: 100%;
    padding: 15px 15px 10px;
    cursor: pointer;
  }

  .group-wrapper:hover {
    background-color: $secondary-background-color;
  }

  .group-header {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }

  p {
    color: $primary-text-color;
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
    background-image: $icon-group-action;
  }

  ul {
    padding-left: 24px;
    margin: 5px 0 10px;
  }

  li {
    height: 26px;
    line-height: 26px;
    color: $primary-text-color;
  }

  li::marker {
    font-size: 22px;
  }

  li.selected {
    color: $main-color;
  }
</style>

<template>
  <div class="button-wrapper">
    <button :class="oneSelected">
      <span class="icon edit"></span>
    </button>
    <button
        class="group"
        :class="{'active': atLeastOneSelected, 'highlighted': showGroupWrapper}"
        @click="toggleGroupWrapper">
      <span class="icon group"></span>
      <span class="icon arrow-down"></span>
    </button>

    <!-- Context menu should not be the last element in the button-wrapper, to ensure the :last-child selector is working on the button -->
    <GroupContextMenu :showWrapper="showGroupWrapper"/>

    <button :class="atLeastOneSelected" @click="assetStore.removeAllSelectedAssets">
      <span class="icon delete"></span>
    </button>
  </div>
</template>

<script>

import { useAssetStore } from '@/stores/AssetStore'
import GroupContextMenu from '@/components/asset/searchbar/GroupContextMenu';

export default {
  name: 'ActionButtons',
  components: {
    GroupContextMenu
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore
    }
  },
  data() {
    return {
      showGroupWrapper: false
    }
  },
  computed: {
    oneSelected() {
      return (this.assetStore.selectedAssetCount === 1) ? 'active' : ''
    },
    atLeastOneSelected() {
      return (this.assetStore.selectedAssetCount >= 1) ? 'active' : ''
    }
  },
  methods: {
    toggleGroupWrapper() {
      this.showGroupWrapper = (!this.showGroupWrapper)
    }
  },

}
</script>

<style scoped>
  .button-wrapper {
    position: relative;
    display: flex;
  }

  .button-wrapper button {
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--passive-border-color);
    background-color: var(--secondary-infill-color);
  }

  button {
    cursor: not-allowed;
    pointer-events: none;
  }

  button.active {
    cursor: pointer;
    pointer-events: all;
  }

  button.active:hover {
    background-color: var(--primary-background-color);
  }

  button.highlighted {
    background-color: var(--primary-background-color);
  }

  button.group {
    width: 70px;
    column-gap: 8px;
  }

  button:first-child {
    border-radius: var(--primary-border-radius) 0 0 var(--primary-border-radius);
  }

  button:last-child {
    border-radius: 0 var(--primary-border-radius) var(--primary-border-radius) 0;
  }

  button:not(:last-child) {
    border-right: 0;
  }

  .icon {
    width: 18px;
    height: 18px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 10;
    opacity: 0.6;
  }

  .icon.arrow-up,
  .icon.arrow-down {
    width: 10px;
    height: 10px;
  }

  .icon.edit       { background-image: var(--icon-edit-action);   }
  .icon.group      { background-image: var(--icon-group-action);  }
  .icon.delete     { background-image: var(--icon-delete-action); }
  .icon.arrow-up   { background-image: var(--icon-arrow-up);      }
  .icon.arrow-down { background-image: var(--icon-arrow-down);    }

  button.active .icon {
    opacity: 1;
  }

</style>
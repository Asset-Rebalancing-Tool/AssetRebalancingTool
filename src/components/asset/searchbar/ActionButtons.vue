<template>
  <div class="button-wrapper">
    <button :class="activeEditButton">
      <span class="icon edit"></span>
    </button>
    <button :class="activeMoveButton" class="group">
      <span class="icon group"></span>
      <span class="icon arrow-down"></span>
    </button>
    <button  :class="activeDeleteButton">
      <span class="icon delete"></span>
    </button>
  </div>
</template>

<script>

import { useAssetStore } from '@/stores/AssetStore'

export default {
  name: 'ActionButtons',
  computed: {
    activeEditButton() {
      return (this.assetStore.selectedAssetCount === 1) ? 'active' : ''
    },
    activeMoveButton() {
      return (this.assetStore.selectedAssetCount >= 1) ? 'active' : ''
    },
    activeDeleteButton() {
      return (this.assetStore.selectedAssetCount >= 1) ? 'active' : ''
    },
  },
  setup() {
    const assetStore = useAssetStore()
    return {
      assetStore
    }
  },
}
</script>

<style scoped>
  .button-wrapper {
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
  }

  button.active {
    cursor: pointer;
  }

  button.active:hover {
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
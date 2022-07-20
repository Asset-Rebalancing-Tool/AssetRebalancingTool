<template>
  <div class="button-wrapper" :class="activeActionButtons">
    <button>
      <span class="icon edit"></span>
    </button>
    <button class="group">
      <span class="icon group"></span>
      <span class="icon arrow-down"></span>
    </button>
    <button>
      <span class="icon delete"></span>
    </button>
  </div>
</template>

<script>

import { useAssetStore } from '@/stores/AssetStore'

export default {
  name: 'ActionButtons',
  data() {
    return {
      isActive: true
    }
  },
  computed: {
    // Returns a class that is used to highlight the button wrapper, if at least one asset is selected
    activeActionButtons() {
      return (this.assetStore.actionButtonsAreActive) ? 'active' : ''
    }
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
    cursor: default;
    pointer-events: none;
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

  .button-wrapper.active {
    cursor: pointer;
    pointer-events: all;
  }

  .button-wrapper.active button:hover {
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

  .button-wrapper.active .icon {
    opacity: 1;
  }

</style>
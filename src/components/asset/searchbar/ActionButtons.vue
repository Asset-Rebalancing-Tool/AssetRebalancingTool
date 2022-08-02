<template>
  <div class="button-wrapper">
    <button :class="oneSelected">
      <span class="icon edit"></span>
    </button>
    <button
        class="group"
        :class="{'active': atLeastOneSelected, 'highlighted': assetStore.showGroupWrapper}"
        @click="toggleGroupWrapper">
      <span class="icon group"></span>
      <span class="icon arrow-down"></span>
    </button>
    <!-- Context menu should not be the last element in the button-wrapper, to ensure the :last-child selector is working on the button -->
    <GroupContextMenu :showWrapper="assetStore.showGroupWrapper"/>
    <button :class="atLeastOneSelected" @click="assetStore.removeAllSelectedAssets">
      <span class="icon delete"></span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAssetStore } from '@/stores/AssetStore'
import GroupContextMenu from './GroupContextMenu.vue';


export default defineComponent({
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
    oneSelected(): string {
      return (this.assetStore.selectedAssetCount === 1) ? 'active' : ''
    },
    atLeastOneSelected(): string {
      return (this.assetStore.selectedAssetCount >= 1) ? 'active' : ''
    }
  },
  methods: {
    toggleGroupWrapper(): void {
      this.assetStore.showGroupWrapper = (!this.assetStore.showGroupWrapper)
    },
  }
})
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
    border: 1px solid $passive-border-color;
    background-color: $secondary-infill-color;
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
    background-color: $primary-background-color;
  }

  button.highlighted {
    background-color: $primary-background-color;
  }

  button.group {
    width: 70px;
    column-gap: 8px;
  }

  button:first-child {
    border-radius: $primary-border-radius 0 0 $primary-border-radius;
  }

  button:last-child {
    border-radius: 0 $primary-border-radius $primary-border-radius 0;
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

  .icon.edit       { background-image: $icon-edit-action);   }
  .icon.group      { background-image: $icon-group-action);  }
  .icon.delete     { background-image: $icon-delete-action); }
  .icon.arrow-up   { background-image: $icon-arrow-up);      }
  .icon.arrow-down { background-image: $icon-arrow-down);    }

  button.active .icon {
    opacity: 1;
  }

</style>

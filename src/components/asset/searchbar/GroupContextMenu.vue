<template>
  <div class="move-action-wrapper" v-show="showWrapper">

    <header>
      <p>Neue Gruppe erstellen</p>
      <button>
        <span class="icon group"></span>
        <span class="icon plus"></span>
      </button>
    </header>

    <label>
      <input type="text" placeholder="Gruppen filtern">
      <span class="icon search"></span>
    </label>

    <GroupAccordion
        v-for="group in assetStore.ownedGroups"
        :key="group.uuid"
        :thisGroup="group"
    />

    <GroupAccordion :thisGroup="{name: 'Keine Gruppe'}">
        <li v-for="asset in assetStore.getAssetsWithoutGroup()"
            :key="asset.uuid"
            :class="{'selected': asset.isSelected}"
        >{{asset.name}}</li>
    </GroupAccordion>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAssetStore } from '@/stores/AssetStore';
import GroupAccordion from './GroupAccordion.vue';

export default defineComponent({
  name: 'GroupContextMenu',
  components: {
    GroupAccordion
  },
  props: {
    showWrapper: {
      type: Boolean,
      default: false
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

<style scoped>
  .move-action-wrapper {
    position: absolute;
    right: 0;
    bottom: -415px; /* Input height 52px + Row gap 10px + Modal height Xpx */
    width: 280px;
    background-color: var(--primary-background-color);
    border: 1px solid var(--passive-border-color);
    border-radius: var(--primary-border-radius);
    box-shadow: 3px 3px 6px rgba(0,0,0,0.16);
    z-index: 10;
    overflow: hidden;
  }

  .move-action-wrapper.active {
    display: block;
  }

  header {
    display: flex;
    padding: 15px;
    margin-bottom: 10px;
  }

  p {
    color: var(--primary-text-color);
    font-size: 18px;
    line-height: 22px;
    margin-top: 2px;
  }

  button {
    width: 80px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 8px;
    border: 1px solid var(--passive-border-color);
    background-color: var(--secondary-infill-color);
    border-radius: var(--primary-border-radius);
    cursor: pointer;
  }

  button:hover {
    background-color: var(--primary-background-color);
  }

  input {
    width: calc(100% - 30px);
    height: 46px;
    padding: 0 18px;
    margin: 0 15px 10px;
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
  .icon.plus {
    background-image: var(--icon-add);
    width: 13px;
    height: 13px;
  }
  .icon.search {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    right: 35px;
    transform: translateY(-50%);
    background-image: var(--icon-searchbar);
  }

  /* duplicated, since I need to scope the style tag */

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

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
      <input type="text" placeholder="Gruppen filtern" />
      <span class="icon search"></span>
    </label>

    <GroupAccordion
      v-for="group in assetStore.ownedGroups"
      :key="group.uuid"
      :thisGroup="group"
    />

    <GroupAccordion :thisGroup="{ name: 'Keine Gruppe' }">
      <li
        v-for="asset in assetStore.getAssetsWithoutGroup()"
        :key="asset.uuid"
        :class="{ selected: asset.isSelected }"
      >
        {{ asset.name }}
      </li>
    </GroupAccordion>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import GroupAccordion from '../action-buttons/GroupAccordion.vue'

export default defineComponent({
  name: 'GroupContextMenu',
  components: {
    GroupAccordion,
  },
  props: {
    showWrapper: {
      type: Boolean,
      default: false,
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
  @import "src/assets/scss/components/asset/context-menu/group-context-menu.scss";
</style>

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
      :this-group="group"
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

<script lang="ts" setup>
import { useAssetStore } from '@/stores/AssetStore'
import GroupAccordion from '../action-buttons/GroupAccordion.vue'

const assetStore = useAssetStore()

const props = defineProps({
  showWrapper: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/components/asset/context-menu/group-context-menu.scss';
</style>

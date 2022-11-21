<template>
  <div class="asset-info">
    <slot name="asset-logo">
      <div
        class="asset-logo"
        :class="{
          add: addEventFlag,
          delete: deleteEventFlag,
        }"
        v-bind:style="{
          'background-image': 'url(data:image/png;base64,' + logo + ')',
        }"
      ></div>
    </slot>
    <slot name="asset-name"></slot>
    <div class="additional-info">
      <slot name="additional-info">
        <div class="asset-type">{{ type }}</div>
        <div class="isin-wrapper">
          <span class="label">ISIN</span>
          <span class="isin" @click.prevent="copyISIN($event)">
            {{ isin }} <IconCopy />
          </span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'
import IconCopy from '@/assets/icons/IconCopy.vue'

const assetStore = useAssetStore()

const props = defineProps({
  groupUuid: {
    type: String,
    default: null
  },
  type: {
    type: String,
    required: false,
  },
  isin: {
    type: String,
    required: false,
  },
  logo: {
    type: String,
    required: false,
  },
})

const addEventFlag: ComputedRef<boolean> = computed(() => {
  return assetStore.listActionState.editFlagUngrouped && !props.groupUuid
})

const deleteEventFlag: ComputedRef<boolean> = computed(() => {
  if (!assetStore.listActionState.selectedGroup) {
    return false
  }

  if (assetStore.listActionState.editFlagUngrouped && props.groupUuid === assetStore.listActionState.selectedGroup.uuid) {
    return assetStore.listActionState.editFlagUngrouped
  }
  return false
})

// Copy the isin of an asset into the clipboard
const copyISIN = (event: Event) => {
  const tempTextInput = document.createElement('input')
  if (props.isin !== undefined) {
    tempTextInput.value = props.isin
    document.body.appendChild(tempTextInput)
    tempTextInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempTextInput)
    event.stopPropagation()
    alert('Copied the text: ' + tempTextInput.value)
  }
}
</script>

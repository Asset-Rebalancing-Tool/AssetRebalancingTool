<template>
  <div class="asset-info">
    <div
      class="asset-logo"
      :class="{ 'shake' : editGroupEntries }"
      v-bind:style="{
        'background-image': 'url(data:image/png;base64,' + logo + ')',
      }"
    ></div>
    <h4 v-html="assetNameWithWordMatches"></h4>
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
import { useAssetStore } from '@/stores/AssetStore'
import IconCopy from '@/assets/icons/IconCopy.vue'

const store = useAssetStore()

const props = defineProps({
  assetName: {
    type: String,
    required: true,
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

const editGroupEntries = computed(() => store.selectionState.editGroupEntries)

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

// Highlight the parts of the asset name that matches the user input
const assetNameWithWordMatches = computed((): string => {
  const input: string = store.searchbarState.searchString.toLowerCase()
  const assetName: string = props.assetName.toLowerCase()
  if (assetName.includes(input)) {
    const indexStart: number = assetName.indexOf(input)
    const indexEnd: number = indexStart + input.length
    return (
      props.assetName.substring(0, indexStart) +
      '<mark>' +
      props.assetName.substring(indexStart, indexEnd) +
      '</mark>' +
      props.assetName.substring(indexEnd)
    )
  }
  return props.assetName
})
</script>

<template>
  <div class="info-wrapper">
    <p v-html="assetNameWithWordMatches"></p>
    <div class="info-row">
      <div class="type">{{ type }}</div>
      <span class="isin label">ISIN</span>
      <span class="isin-wrapper" @click.prevent="copyISIN($event)">
        <span class="isin">{{ isin }}</span>
        <span class="icon"></span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAssetStore } from '@/stores/AssetStore'

const assetStore = useAssetStore()

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

const assetNameWithWordMatches = computed((): string => {
  const input: string = assetStore.searchString.toLowerCase()
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

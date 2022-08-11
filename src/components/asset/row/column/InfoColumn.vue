<template>
  <div class="info-wrapper">
    <p>{{ props.name }}</p>
    <div class="info-row">
      <div class="type">{{ props.type }}</div>
      <span class="isin label">ISIN</span>
      <span class="isin-wrapper" @click="copyISIN($event)">
        <span class="isin">{{ props.isin }}</span>
        <span class="icon"></span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  name: {
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
</script>

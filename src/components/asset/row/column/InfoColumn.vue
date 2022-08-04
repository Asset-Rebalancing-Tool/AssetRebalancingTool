<template>
    <div class="info-wrapper">
      <p>{{ name }}</p>
      <div class="info-row">
        <div class="type">{{ type }}</div>
        <span class="isin label">ISIN</span>
        <span class="isin-wrapper" @click="copyISIN($event)">
          <span class="isin">{{ isin }}</span>
          <span class="icon"></span>
        </span>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InfoColumn',
  props: {
    isSelected: {
      type: Boolean,
      required: true,
    },
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
  },
  methods: {
    // copy the isin into the clipboard
    copyISIN(event: Event) {
      const tempTextInput = document.createElement('input')
      if (this.isin !== undefined) {
        tempTextInput.value = this.isin
        document.body.appendChild(tempTextInput)
        tempTextInput.select()
        document.execCommand('copy')
        document.body.removeChild(tempTextInput)
        event.stopPropagation()
        alert('Copied the text: ' + tempTextInput.value)
      }
    },
  },
})
</script>

<template>
  <div class="info-wrapper">
    <div class="asset-image" :class="activeAsset"></div>
    <div class="name-wrapper">
      <p>{{name}}</p>
      <div class="info-row">
        <div class="type">{{type}}</div>
        <span class="isin label">ISIN</span>
        <span class="isin-wrapper" @click="copyISIN($event)">
          <span class="isin">{{isin}}</span>
          <span class="icon"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'InfoColumn',
  props: {
    isSelected: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false
    },
    isin: {
      type: String,
      required: false
    },
  },
  computed: {
    activeAsset() {
      return (this.isSelected) ? 'selected' : ''
    }
  },
  methods: {
    // copy the isin into the clipboard
    copyISIN(event: Event) {
      let tempTextInput = document.createElement("input");
      if (this.isin !== undefined) {
        tempTextInput.value = this.isin;
        document.body.appendChild(tempTextInput);
        tempTextInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextInput);
        event.stopPropagation()
        alert("Copied the text: " + tempTextInput.value);
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .info-wrapper {
    flex: 1;
    height: $asset-row-height;
    display: flex;
  }

  .asset-image {
    height: 38px;
    width: 38px;
    margin: 10px;
    background-color: $tertiary-background-color;
    border-radius: $secondary-border-radius;
  }

  .asset-image.selected {
    background-image: $icon-selected-asset;
  }

  .name-wrapper {
    height: $asset-row-height);
  }

  p {
    color: $primary-text-color);
    font-weight: 600;
    margin-top: 3px;
  }

  .info-row {
    display: flex;
    column-gap: 6px;
  }

  .type {
    height: 20px;
    background-color: $main-color);
    border-radius: $secondary-border-radius);
    color: $primary-text-color);
    font-weight: 600;
    padding: 0 5px;
    line-height: 1.4;
    margin-top: 2px;
    font-size: 14px;
  }

  .isin-wrapper {
    cursor: pointer;
    display: flex;
    column-gap: 8px;
    padding: 0 4px;
    border-radius: $secondary-border-radius);
  }

  .isin-wrapper:hover {
    background-color: $tertiary-background-color);
  }

  .isin {
    color: $secondary-text-color);
  }

  .isin.label {
    color: $tertiary-text-color);
    margin-left: 4px;

  }

  .icon {
    width: 15px;
    height: 15px;
    margin-top: 4px;
    background-image: $icon-copy-clipboard);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }

</style>

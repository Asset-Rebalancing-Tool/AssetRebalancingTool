<template>
  <div class="info-wrapper">
    <div class="asset-image" :class="activeAsset"></div>
    <div class="name-wrapper">
      <p>{{name}}</p>
      <div class="info-row">
        <div class="type">{{type}}</div>
        <span class="isin label">ISIN</span>
        <span class="isin-wrapper">
          <span class="isin">{{isin}}</span>
          <span class="icon"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoColumn',
  props: {
    isSelected: {
      type: Object,
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
  }
}
</script>

<style scoped>
  .info-wrapper {
    flex: 1;
    height: var(--asset-row-height);
    display: flex;
  }

  .asset-image {
    height: 38px;
    width: 38px;
    margin: 10px;
    background-color: var(--tertiary-background-color);
    border-radius: var(--secondary-border-radius);
  }

  .asset-image.selected {
    background-image: var(--icon-selected-asset);
  }

  .name-wrapper {
    height: var(--asset-row-height);
  }

  p {
    color: var(--primary-text-color);
    font-weight: 600;
    margin-top: 3px;
  }

  .info-row {
    display: flex;
    column-gap: 6px;
  }

  .type {
    height: 20px;
    background-color: var(--main-color);
    border-radius: var(--secondary-border-radius);
    color: var(--primary-text-color);
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
    border-radius: var(--secondary-border-radius);
  }

  .isin-wrapper:hover {
    background-color: var(--tertiary-background-color);
  }

  .isin {
    color: var(--secondary-text-color);
  }

  .isin.label {
    color: var(--tertiary-text-color);
    margin-left: 4px;

  }

  .icon {
    width: 15px;
    height: 15px;
    margin-top: 4px;
    background-image: var(--icon-copy-clipboard);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }

</style>
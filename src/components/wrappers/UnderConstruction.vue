<template>
  <div class="construction-container">
    <div class="construction-text-wrapper" v-if="!showConstructionInfo">
      <h1 class>{{ $t('underConstruction.heading') }}</h1>
      <p>{{ $t('underConstruction.description') }}</p>
      <button @click="showConstructionInfo = true">
        {{ $t('underConstruction.moreInfo') }}
      </button>
    </div>
    <img
      v-if="!showConstructionInfo"
      class="construction-image"
      src="@/assets/images/under-construction.png"
      :alt="$t('underConstruction.imageAltTag')"
    />

    <div class="construction-info-wrapper" v-if="showConstructionInfo">
      <IconCloseConstructionText @click="showConstructionInfo = false" />
      <h3>{{ constructionTitle }}</h3>
      <p>{{ constructionText }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import IconCloseConstructionText from '@/assets/icons/IconCloseConstructionText.vue'

const props = defineProps({
  constructionTitle: {
    type: String,
    required: true,
  },
  constructionText: {
    type: String,
    required: true,
  },
})

const showConstructionInfo: Ref<boolean> = ref(false)
</script>

<style lang="scss" scoped>
.construction-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;

  .construction-text-wrapper {
    margin-right: -25px;
    max-width: 425px;
    margin-top: 25px;

    h1 {
      font-size: 40px;
    }

    p {
      color: $secondary-text-color;
      font-size: 18px;
      margin-top: 10px;
    }

    button {
      background-color: $main-color;
      border: none;
      border-radius: $secondary-border-radius;
      color: $primary-text-color;
      padding: 10px 18px;
      cursor: pointer;
      margin-top: 25px;
      font-size: 16px;
    }
  }

  .construction-image {
    margin-left: -25px;
  }

  .construction-info-wrapper {
    position: relative;
    width: 500px;
    background: $secondary-background-color;
    border-radius: $primary-border-radius;
    padding: 22px;

    svg {
      position: absolute;
      top: 25px;
      right: 25px;
      width: 18px;
      height: 18px;
      cursor: pointer;
      z-index: 25;
    }

    h3 {
      font-size: 24px;
      line-height: 24px;
      margin-bottom: 18px;
    }

    p {
      font-size: 18px;
      color: $secondary-text-color;
      line-height: 32px;
    }
  }
}
</style>

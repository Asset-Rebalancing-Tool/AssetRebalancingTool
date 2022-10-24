<template>
  <div class="construction-container">

    <div class="construction-text-wrapper" v-if="showConstructionFlag">
      <h1 class>{{ $t('underConstruction.heading') }}</h1>
      <p>{{ $t('underConstruction.description') }}</p>
      <button>{{ $t('underConstruction.moreInfo') }}</button>
    </div>
    <img
      v-if="showConstructionFlag"
      class="construction-image"
      src="@/assets/images/under-construction.png"
      :alt="$t('underConstruction.imageAltTag')"
    />

    <div class="construction-info-wrapper" v-if="!showConstructionFlag">
      <div class="close-info"></div>
      <p>Lorem ipsum dolor</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";

const props = defineProps({
  constructionText: {
    type: String,
    default: true,
  },
})

const showConstructionFlag: Ref<boolean> = ref(true)

</script>

<style lang="scss" scoped>
.construction-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
}

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
    border-radius: $primary-border-radius;
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
</style>

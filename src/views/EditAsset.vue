<template>
  <section id="edit-asset">

    <BreadcrumbNavigation />

    <div class="card-wrapper">
      <CardWrapper :header-text="'Live Daten'">
        <template #content>
          <InfoColumn
              :asset-name="asset.assetName"
              :type="asset.assetType"
              :isin="asset.isin"
          />
        </template>
      </CardWrapper>

      <CardWrapper :header-text="'Asset hinzufügen'">
        <template #content>

        </template>
      </CardWrapper>

    </div>
  </section>
</template>

<script lang="ts" setup>
import BreadcrumbNavigation from '@/components/edit-asset/BreadcrumbNavigation.vue'
import CardWrapper from '@/components/edit-asset/CardWrapper.vue'
import InfoColumn from '@/components/asset-list/row/column/InfoColumn.vue';
import { useAssetStore } from "@/stores/AssetStore";
import { computed } from "vue";

const assetStore = useAssetStore()

const props = defineProps({
  uuid: {
    type: String,
    required: true,
  }
})

const asset = computed(() => {
  return assetStore.getSearchbarAsset(props.uuid)
})
</script>

<style lang="scss">
@import "src/assets/scss/components/asset/row/column/info-column.scss";
@import 'src/assets/scss/views/_edit-asset';
</style>

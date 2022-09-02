<template>
  <section id="asset-list">

    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <Container class="asset-container" @drop="onDrop($event)">

      <!--Asset Group Holdings -->
      <!--<Draggable v-for="group in assetHoldingGroups" :key="group.uuid">
        <AssetGroup>
          <template #assets>
            <Container @drop="onGroupDrop($event)">

              <Draggable v-for="asset in group.assets" :key="asset.order">
                <AssetRow
                    :id="asset.uuid"
                    :name="asset.name"
                />
              </Draggable>
            </Container>
          </template>
        </AssetGroup>
      </Draggable>-->

      <!-- Public Asset Holdings -->
      <Draggable v-if="assetHoldingsExist" v-for="assetHolding in store.publicAssetHoldings" :key="assetHolding.holdingUuid">
        <AssetRow :asset-holding="assetHolding" />
      </Draggable>

    </Container>
    <footer></footer>
  </section>
</template>

<script setup>
import SearchbarInput from '@/components/inputs/SearchbarInput.vue'
import SearchbarContent from '@/components/wrappers/SearchbarContent.vue'
import AssetRow from '@/components/wrappers/AssetRow.vue'
import AssetGroup from '@/components/wrappers/AssetGroup.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import { Container, Draggable } from "vue-dndrop";
import { applyDrag } from "@/composables/ApplyDrag";
import { computed, onMounted } from "vue";
import AssetService from "@/services/AssetService";
import { useAssetStore } from "@/stores/AssetStore";

const store = useAssetStore()

onMounted(async () => {
  store.publicAssetHoldings = await AssetService.fetchPublicAssetHoldings()
})

const assetHoldingsExist = computed(() => {
  return store.publicAssetHoldings.length !== 0
})

function onDrop(dropResult) {
  //assets.value = applyDrag(assets.value, dropResult);
}

function onGroupDrop(dropResult) {
  //groupAssets.value = applyDrag(groupAssets.value, dropResult);
}
</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>

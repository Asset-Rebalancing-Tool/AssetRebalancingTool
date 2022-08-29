<template>
  <section id="asset-list">

    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <Container @drop="onDrop($event)" class="asset-container">

      <Draggable v-for="asset in assets" :key="asset.order">
        <AssetRow :id="asset.order" :name="asset.name" />
      </Draggable>

<!--      <Draggable>
        <AssetGroup>
          <template #assets>

            <Container @drop="onGroupDrop($event)">
              <Draggable v-for="groupAsset in groupAssets" :key="groupAsset.id">
                <AssetRow :id="groupAsset.id" :name="groupAsset.name" />
              </Draggable>
            </Container>

          </template>
        </AssetGroup>
      </Draggable>-->

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
import { ref } from "vue";

let assets = ref([
  { order: 0, name: 'test1' },
  { order: 1, name: 'test2' },
  { order: 2, name: 'test3' },
  { order: 3, name: 'test4' }
])

let groupAssets = ref([
  { order: 0, name: 'test5' },
  { order: 1, name: 'test6' },
  { order: 2, name: 'test7' },
  { order: 3, name: 'test8' }
])

function onDrop(dropResult) {
  assets.value = applyDrag(assets.value, dropResult);
}

function onGroupDrop(dropResult) {
  groupAssets.value = applyDrag(groupAssets.value, dropResult);
}
</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>

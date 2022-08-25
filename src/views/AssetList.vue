<template>
  <section id="asset-list">
    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <div class="asset-container">
      <AssetRow />
      <AssetGroup>
        <template #assets>
          <AssetRow />
          <AssetRow />
        </template>
      </AssetGroup>
    </div>

    <footer></footer>
  </section>
</template>

<script lang="ts" setup>
import SearchbarInput from '@/components/inputs/SearchbarInput.vue'
import SearchbarContent from '@/components/wrappers/SearchbarContent.vue'
import AssetRow from '@/components/wrappers/AssetRow.vue'
import AssetGroup from '@/components/wrappers/AssetGroup.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>

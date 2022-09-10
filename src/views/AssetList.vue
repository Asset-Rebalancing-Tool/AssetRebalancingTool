<template>
  <section id="asset-list">
    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <div class="holding-container">

      <Container @drop="onDrop">
        <Draggable v-for="holding in store.assetListEntries" :key="holding.uuid">
          <HoldingGroup
              v-if="holding.entryType === AssetListEntryTypeEnum.HOLDING_GROUP"
              :key="holding.uuid"
              :holding="holding.holdingGroup"
          ></HoldingGroup>

          <PublicHolding
              v-if="holding.entryType === AssetListEntryTypeEnum.PUBLIC_HOLDING"
              :key="holding.uuid"
              :holding="holding.publicHolding"
          />

          <PrivateHolding
              v-if="holding.entryType === AssetListEntryTypeEnum.PRIVATE_HOLDING"
              :key="holding.uuid"
              :holding="holding.privateHolding"
          />
        </Draggable>
      </Container>
    </div>

    <footer>
      <h4>Portfoliowert</h4>
      <span></span>
      <span></span>
      <span class="total-value">16.802,36 €</span>
      <span class="total-percentage">100,00 % <IconCheck /></span>
      <ThreeDigitValue :value-array="testDeviation" :unit="'%'" :arrow="'up'">
        <template #arrow>
          <IconAssetRowArrow />
        </template>
      </ThreeDigitValue>
    </footer>
  </section>
</template>

<script lang="ts" setup>

import { Container, Draggable } from 'vue-dndrop';
import { applyDrag } from '@/composables/dndDrop';
import { onMounted } from 'vue';
import SearchbarInput from '@/components/inputs/SearchbarInput.vue'
import SearchbarContent from '@/components/wrappers/SearchbarContent.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import AssetService from '@/services/FetchAssetService'
import {useAssetStore} from '@/stores/AssetStore'
import IconCheck from '@/assets/icons/IconCheck.vue'
import PublicHolding from '@/components/wrappers/PublicHolding.vue'
import PrivateHolding from '@/components/wrappers/PrivateHolding.vue'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry';
import { AssetListEntryTypeEnum } from "@/models/enums/AssetListEntryTypeEnum";
import HoldingGroup from "@/components/wrappers/HoldingGroup.vue";
import PatchAssetService from "@/services/PatchAssetService";
import type { PublicHoldingRequest } from "@/requests/PublicHoldingRequest";
import type { PrivateHoldingRequest } from "@/requests/PrivateHoldingRequest";
import type {HoldingGroupRequest} from "@/requests/HoldingGroupRequest";

const store = useAssetStore()

const testDeviation = ['08', '62', '1']

onMounted(async () => {
  store.assetListEntries = await generateHoldingRow()
})

async function generateHoldingRow() {
  let genericHoldingRows: AssetListEntry[] = []
  let holdingGroups: HoldingGroup[] = await AssetService.fetchHoldingGroups()
  let publicHoldings: PublicHolding[] = await AssetService.fetchPublicHoldings()
  let privateHoldings: PrivateHolding[] = await AssetService.fetchPrivateHoldings()

  holdingGroups.forEach(group => {
    genericHoldingRows.push({
      uuid: group.uuid,
      entryType: AssetListEntryTypeEnum.HOLDING_GROUP,
      holdingGroup: group
    } as AssetListEntry)
  })

  publicHoldings.forEach(holding => {
    genericHoldingRows.push({
      uuid: holding.uuid,
      entryType: AssetListEntryTypeEnum.PUBLIC_HOLDING,
      publicHolding: holding
    } as AssetListEntry)
  })

  privateHoldings.forEach(holding => {
    genericHoldingRows.push({
      uuid: holding.uuid,
      entryType: AssetListEntryTypeEnum.PRIVATE_HOLDING,
      privateHolding: holding
    } as AssetListEntry)
  })

  return genericHoldingRows
}

function onDrop(dropResult: any) {
  let sortedHoldingRows: AssetListEntry[] = applyDrag(store.assetListEntries, dropResult);
  sortedHoldingRows.forEach(holding => {
    switch (holding.entryType) {
      case AssetListEntryTypeEnum.PUBLIC_HOLDING:
        let publicHoldingRequest = { publicHolding: PublicHolding } as unknown as PublicHoldingRequest
        PatchAssetService.patchPublicHolding(publicHoldingRequest, holding.publicHolding!.uuid)
        break;
      case AssetListEntryTypeEnum.PRIVATE_HOLDING:
        let privateHoldingRequest = { privateHolding: PrivateHolding } as unknown as PrivateHoldingRequest
        PatchAssetService.patchPrivateHolding(privateHoldingRequest, holding.privateHolding!.uuid)
        break;
      case AssetListEntryTypeEnum.HOLDING_GROUP:
        let holdingGroupRequest = { holdingGroup: HoldingGroup } as unknown as HoldingGroupRequest
        PatchAssetService.patchHoldingGroup(holdingGroupRequest, holding.holdingGroup!.uuid)
        break;
    }
  })

  store.assetListEntries = sortedHoldingRows
}
</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>

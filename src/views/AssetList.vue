<template>
  <section id="asset-list">
    <header>
      <SearchbarInput />
      <SearchbarContent />
    </header>

    <TableFilters />

    <div class="holding-container">

      <Container @drop="onDrop">
        <Draggable v-for="holding in store.genericHoldingRow" :key="holding.uuid">
          <HoldingGroup
              v-if="holding.type === GenericRowType.HOLDING_GROUP"
              :key="holding.uuid"
              :holding="holding.holdingGroup"
          ></HoldingGroup>

          <PublicHolding
              v-if="holding.type === GenericRowType.PUBLIC_HOLDING"
              :key="holding.uuid"
              :holding="holding.publicHolding"
          />

          <PrivateHolding
              v-if="holding.type === GenericRowType.PRIVATE_HOLDING"
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
import SearchbarInput from '@/components/inputs/SearchbarInput.vue'
import SearchbarContent from '@/components/wrappers/SearchbarContent.vue'
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import TableFilters from '@/components/wrappers/TableFilters.vue'
import { onMounted } from 'vue'
import AssetService from '@/services/FetchAssetService'
import {useAssetStore} from '@/stores/AssetStore'
import IconCheck from '@/assets/icons/IconCheck.vue'
import PublicHolding from '@/components/wrappers/PublicHolding.vue'
import PrivateHolding from '@/components/wrappers/PrivateHolding.vue'
import type {GenericHoldingRow} from '@/models/GenericHoldingRow';
import { GenericRowType } from "@/models/enums/GenericRowType";
import HoldingGroup from "@/components/wrappers/HoldingGroup.vue";
import PatchAssetService from "@/services/PatchAssetService";
import type { PublicHoldingRequest } from "@/requests/PublicHoldingRequest";
import type { PrivateHoldingRequest } from "@/requests/PrivateHoldingRequest";
import type {HoldingGroupRequest} from "@/requests/HoldingGroupRequest";

const store = useAssetStore()

const testDeviation = ['08', '62', '1']

onMounted(async () => {
  store.genericHoldingRow = await generateHoldingRow()
})

async function generateHoldingRow() {
  let tempArray: GenericHoldingRow[] = []

  store.holdingGroups = await AssetService.fetchAssetHoldingGroups()
  store.publicHoldings = await AssetService.fetchPublicAssetHoldings()
  store.privateHoldings = await AssetService.fetchPrivateAssetHoldings()

  store.holdingGroups.forEach(group => {
    tempArray.push({
      uuid: group.uuid,
      type: GenericRowType.HOLDING_GROUP,
      holdingGroup: group
    } as GenericHoldingRow)
  })

  store.publicHoldings.forEach(holding => {
    tempArray.push({
      uuid: holding.holdingUuid,
      type: GenericRowType.PUBLIC_HOLDING,
      publicHolding: holding
    } as GenericHoldingRow)
  })

  store.privateHoldings.forEach(holding => {
    tempArray.push({
      uuid: holding.holdingUuid,
      type: GenericRowType.PRIVATE_HOLDING,
      privateHolding: holding
    } as GenericHoldingRow)
  })

  return tempArray
}

function onDrop(dropResult: any) {
  let sortedHoldingRows: GenericHoldingRow[] = applyDrag(store.genericHoldingRow, dropResult);



  // patch each generic holding based on its type
  sortedHoldingRows.forEach(holding => {
    switch (holding.type) {
      case GenericRowType.PUBLIC_HOLDING:
        let publicHoldingRequest = { publicHolding: PublicHolding } as unknown as PublicHoldingRequest
        PatchAssetService.patchPublicHolding(publicHoldingRequest, holding.publicHolding!.holdingUuid)
        break;
      case GenericRowType.PRIVATE_HOLDING:
        let privateHoldingRequest = { privateHolding: PrivateHolding } as unknown as PrivateHoldingRequest
        PatchAssetService.patchPrivateHolding(privateHoldingRequest, holding.privateHolding!.holdingUuid)
        break;
      case GenericRowType.HOLDING_GROUP:
        let holdingGroupRequest = { holdingGroup: HoldingGroup } as unknown as HoldingGroupRequest
        PatchAssetService.patchHoldingGroup(holdingGroupRequest, holding.holdingGroup!.uuid)
        break;
    }
  })

  store.genericHoldingRow = sortedHoldingRows
}

/**
 * Build the request body for the public holding patch
 *
 * @param holding PublicHolding
 */
function publicHoldingPatchRequest(holding: PublicHolding): PublicHoldingRequest {
  return { PublicHolding } as unknown as PublicHoldingRequest
}

/**
 * Build the request body for the private holding patch
 *
 * @param inputValue string
 */
function privateHoldingPatchRequest(inputValue: string): PublicHoldingRequest {
  const data: number = +inputValue
  return { data } as unknown as PublicHoldingRequest
}
</script>

<style lang="scss">
@import '@/assets/scss/views/asset-list.scss';
</style>

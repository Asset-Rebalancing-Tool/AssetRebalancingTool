<template>
  <HoldingGroup
    v-if="holding.entryType === AssetListEntryTypeEnum.HOLDING_GROUP"
    :key="holding.uuid"
    :holding="holding"
  >
    <template #holdings>
        <PublicHolding
            v-for="publicHolding in holding.publicHolding"
            :key="publicHolding.uuid"
            :holding="publicHolding"
            @click="removePublicEntryFromGroup(holding, publicHolding)"
        />
        <PrivateHolding
            v-for="privateHolding in holding.privateHolding"
            :key="privateHolding.uuid"
            :holding="privateHolding"
            @click="removePrivateEntryFromGroup(holding, privateHolding)"
        />
    </template>
  </HoldingGroup>

  <PublicHolding
    v-if="holding.entryType === AssetListEntryTypeEnum.PUBLIC_HOLDING"
    :key="holding.uuid"
    :holding="holding.publicHolding"
    @click="addPublicEntryToGroup(index, holding)"
  />

  <PrivateHolding
    v-if="holding.entryType === AssetListEntryTypeEnum.PRIVATE_HOLDING"
    :key="holding.uuid"
    :holding="holding.privateHolding"
    @click="addPrivateEntryToGroup(index, holding)"
  />
</template>

<script lang="ts" setup>
import PatchAssetService from '@/services/PatchAssetService'
import HoldingGroup from '@/components/wrappers/asset-list/list-entries/groups/HoldingGroup.vue'
import PublicHolding from '@/components/wrappers/asset-list/list-entries/PublicHolding.vue'
import PrivateHolding from '@/components/wrappers/asset-list/list-entries/PrivateHolding.vue'
import type { HoldingGroup as HoldingGroupType } from '@/models/holdings/HoldingGroup'
import type { PublicHolding as PublicHoldingType } from '@/models/holdings/PublicHolding'
import type { PrivateHolding as PrivateHoldingType } from '@/models/holdings/PrivateHolding'
import { AssetListEntryTypeEnum } from '@/models/enums/AssetListEntryTypeEnum'
import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import type { PropType } from 'vue'
import { useAssetStore } from "@/stores/AssetStore";
import type { HoldingGroupRequest } from "@/requests/HoldingGroupRequest";
import type { PublicHoldingRequest } from "@/requests/PublicHoldingRequest";
import type { PrivateHoldingRequest } from "@/requests/PrivateHoldingRequest";
import {AssetTypeEnum} from "@/models/enums/AssetTypeEnum";
import {CurrencyEnum} from "@/models/enums/CurrencyEnum";
import {UnitTypeEnum} from "@/models/enums/UnitTypeEnum";

const store = useAssetStore()
const props = defineProps({
  holding: {
    type: Object as PropType<AssetListEntry>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  }
})



function removePublicEntryFromGroup(assetListEntry: AssetListEntry, publicHolding: PublicHoldingType): void {
  let holdingGroup: HoldingGroupType = assetListEntry.holdingGroup!

  store.removePublicEntryFromGroup(holdingGroup.uuid, publicHolding.uuid)
  PatchAssetService.patchPublicHolding(
      patchPublicHoldingRequest(publicHolding),
      publicHolding.uuid
  )
  PatchAssetService.patchHoldingGroup(
      patchHoldingGroupRequest(holdingGroup),
      holdingGroup.uuid
  )
}

function removePrivateEntryFromGroup(assetListEntry: AssetListEntry, privateHolding: PrivateHoldingType): void {
  let holdingGroup: HoldingGroupType = assetListEntry.holdingGroup!

  store.removePrivateEntryFromGroup(holdingGroup.uuid, privateHolding.uuid)
  PatchAssetService.patchPrivateHolding(
      patchPrivateHoldingRequest(privateHolding),
      privateHolding.uuid
  )
  PatchAssetService.patchHoldingGroup(
      patchHoldingGroupRequest(holdingGroup),
      holdingGroup.uuid
  )
}

function addPublicEntryToGroup(entryListIndex: number, assetListEntry: AssetListEntry): void {
  let publicHolding: PublicHoldingType = assetListEntry.publicHolding!
  let holdingGroup: HoldingGroupType = store.getSelectedGroup()

  store.addPublicEntryToGroup(entryListIndex, publicHolding.uuid)
  PatchAssetService.patchPublicHolding(
      patchPublicHoldingRequest(publicHolding),
      publicHolding.uuid
  )
  PatchAssetService.patchHoldingGroup(
      patchHoldingGroupRequest(holdingGroup),
      holdingGroup.uuid
  )
}

function addPrivateEntryToGroup(entryListIndex: number, assetListEntry: AssetListEntry): void {
  let privateHolding: PrivateHoldingType = assetListEntry.privateHolding!
  let holdingGroup: HoldingGroupType = store.getSelectedGroup()
  console.log(holdingGroup)
  store.addPrivateEntryToGroup(entryListIndex, privateHolding.uuid)
  PatchAssetService.patchPrivateHolding(
      patchPrivateHoldingRequest(privateHolding),
      privateHolding.uuid
  )
  PatchAssetService.patchHoldingGroup(
      patchHoldingGroupRequest(holdingGroup),
      holdingGroup.uuid
  )
}

/**-***************************************************-**/
/** ------------- Holding Patch Requests -------------- **/
/**-***************************************************-**/


function patchPublicHoldingRequest(publicHolding: PublicHoldingType): PublicHoldingRequest {
  return {
    currency: publicHolding.currency,
    customName: publicHolding.customName,
    ownedQuantity: publicHolding.ownedQuantity,
    shouldDisplayCustomName: publicHolding.displayCustomName,
    targetPercentage: publicHolding.targetPercentage
  } as PublicHoldingRequest
}

function patchPrivateHoldingRequest(privateHolding: PrivateHoldingType): PrivateHoldingRequest {
  return {
    assetType: privateHolding.assetType,
    pricePerUnit: privateHolding.pricePerUnit,
    ownedQuantity: privateHolding.ownedQuantity,
    unitType: privateHolding.unitType,
    targetPercentage: privateHolding.targetPercentage,
    title: privateHolding.title
  } as PrivateHoldingRequest
}


function patchHoldingGroupRequest(holdingGroup: HoldingGroupType) {
  console.log(holdingGroup)
  return {
    publicHoldingUuids: getPublicHoldingUuidArray(holdingGroup.publicHoldings),
    privateHoldingUuids: getPrivateHoldingUuidArray(holdingGroup.privateHoldings),
    groupName: holdingGroup.groupName,
    targetPercentage: holdingGroup.targetPercentage
  } as HoldingGroupRequest
}

function getPublicHoldingUuidArray(publicHoldings: PublicHoldingType[]): string[] {
  let tempArray: string[] = []
  console.log(publicHoldings)
  publicHoldings.forEach(holding => tempArray.push(holding.uuid))
  return tempArray
}

function getPrivateHoldingUuidArray(privateHoldings: PrivateHoldingType[]): string[] {
  let tempArray: string[] = []
  privateHoldings.forEach(holding => tempArray.push(holding.uuid))
  return tempArray
}

</script>

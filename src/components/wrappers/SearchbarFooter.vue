<template>
  <div class="searchbar-content-footer">
    <div class="footer-info">
      <p>Ist dein Asset nicht dabei?</p>
      <p>
        Erstelle eigene Assets oder Gruppen, um dein Portfolio vollumfänglich
        abzubilden.
      </p>
    </div>
    <div class="button-wrapper">
      <button @click="newPrivateHoldingAction()">
        <span class="icon"></span>Asset erstellen
      </button>
      <button @click="newHoldingGroup()">
        <span class="icon"></span>Gruppe anlegen
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAssetStore } from '@/stores/AssetStore'
import { hideModalUnderlay } from '@/composables/UseModalUnderlay'
import {getAuthorizedInstance, handleErrorResponseStatus} from '@/services/TokenService'
import { AxiosResponse } from 'axios'
import { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import {AssetListEntryTypeEnum} from "@/models/enums/AssetListEntryTypeEnum";
import type {AssetListEntry} from "@/models/holdings/AssetListEntry";
import {CurrencyEnum} from "@/models/enums/CurrencyEnum";
import {UnitTypeEnum} from "@/models/enums/UnitTypeEnum";

const store = useAssetStore()

async function newPrivateHoldingAction() {
  // Hide the modal underlay, no matter what creation will be fired
  hideModalUnderlay()

  const request = {
    assetType: AssetTypeEnum.STOCK,
    pricePerUnit: 0.00,
    currency: CurrencyEnum.EUR,
    ownedQuantity: 0,
    unitType: UnitTypeEnum.PIECE,
    targetPercentage: 0.0,
    title: 'Neues Privates Asset'
  } as PrivateHoldingRequest

  await getAuthorizedInstance().then((instance) => {
    return instance
      .post<PrivateHoldingRequest, AxiosResponse>(
        '/holding_api/asset_holding/private',
        request
      )
      .then((result) => {
        store.assetListEntries.push({
          uuid: result.data.uuid,
          entryType: AssetListEntryTypeEnum.PRIVATE_HOLDING,
          privateHolding: result.data
        } as AssetListEntry)
      })
      .catch(error => handleErrorResponseStatus(error.response.status))
  })
}

async function newHoldingGroup() {
  // Hide the modal underlay, no matter what creation will be fired
  hideModalUnderlay()

  const request = {
    publicHoldingUuids: [],
    privateHoldingUuids: [],
    groupName: 'Meine Gruppe 1',
    targetPercentage: 0,
  } as HoldingGroupRequest

  await getAuthorizedInstance().then((instance) => {
    return instance
      .post<HoldingGroup>('/holding_api/asset_holding/group', request)
      .then((result) => {
        store.assetListEntries.push({
          uuid: result.data.uuid,
          entryType: AssetListEntryTypeEnum.HOLDING_GROUP,
          holdingGroup: result.data
        } as AssetListEntry)
      })
      .catch(error => handleErrorResponseStatus(error.response.status))
  })
}
</script>

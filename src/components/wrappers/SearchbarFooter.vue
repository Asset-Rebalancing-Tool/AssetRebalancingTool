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
import {getAuthorizedInstance, login} from '@/services/TokenService'
import { AxiosResponse } from 'axios'
import { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'

const store = useAssetStore()

async function newPrivateHoldingAction() {
  // Hide the modal underlay, no matter what creation will be fired
  hideModalUnderlay()

  const request = {
    assetType: AssetTypeEnum.STOCK,
    currentPrice: 0.0,
    title: 'Neues Privates Asset',
    targetPercentage: 0.0,
  } as PrivateHoldingRequest

  await login('claes', 'pw')
  await getAuthorizedInstance().then((instance) => {
    return instance
      .post<PrivateHoldingRequest, AxiosResponse>(
        '/holding_api/asset_holding/private',
        request
      )
      .then((result) => {
        store.privateHoldings.push(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
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

  await login('claes', 'pw')
  await getAuthorizedInstance().then((instance) => {
    return instance
      .post<HoldingGroup>('/holding_api/asset_holding/group', request)
      .then((result) => {
        store.holdingGroups.push(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}
</script>

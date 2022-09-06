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
      <button><span class="icon"></span>Gruppe anlegen</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAssetStore } from '@/stores/AssetStore'
import { hideModalUnderlay } from '@/composables/UseModalUnderlay'
import { getAuthorizedInstance } from '@/services/TokenService'
import axios, { AxiosResponse } from 'axios'
import { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { PrivateAssetHoldingRequest } from '@/requests/PrivateAssetHoldingRequest'

const store = useAssetStore()

async function newPrivateHoldingAction() {
  // Hide the modal underlay, no matter what creation will be fired
  hideModalUnderlay()

  const request = {
    assetType: AssetTypeEnum.STOCK,
    currentPrice: 0.0,
    title: 'Neues Privates Asset',
    targetPercentage: 0.0,
  } as PrivateAssetHoldingRequest

  await getAuthorizedInstance().then((instance) => {
    return instance
      .post<PrivateAssetHoldingRequest, AxiosResponse>(
        '/holding_api/asset_holding/private',
        request
      )
      .then((result) => {
        store.privateAssetHoldings.push(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}
</script>

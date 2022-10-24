<template>
  <div class="searchbar-content-footer">
    <div class="footer-info">
      <p>{{ $t('assetList.searchbar.footer.heading') }}</p>
      <p>
        {{ $t('assetList.searchbar.footer.description') }}
      </p>
    </div>
    <div class="button-wrapper">
      <button @click="newPrivateHoldingAction()">
        <span class="icon"></span
        >{{ $t('assetList.searchbar.footer.buttons.newAsset') }}
      </button>
      <button @click="newHoldingGroup()">
        <span class="icon"></span
        >{{ $t('assetList.searchbar.footer.buttons.newGroup') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAssetStore } from '@/stores/AssetStore'
import { hideModalUnderlay } from '@/composables/UseModalUnderlay'
import { getAuthorizedInstance } from '@/services/TokenService'
import { AxiosResponse } from 'axios'
import { AssetTypeEnum } from '@/models/enums/AssetTypeEnum'
import type { PrivateHoldingRequest } from '@/requests/PrivateHoldingRequest'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import { UnitTypeEnum } from '@/models/enums/UnitTypeEnum'
import { addPrivateHoldingToRenderList } from '@/composables/assets/UseAssetRenderList'
import { addPrivateHoldingToPool } from '@/composables/assets/UseAssetPool'
import { addHoldingGroup } from '@/composables/assets/UseHoldingGroup'
import { useI18n } from 'vue-i18n'
import { useNotificationStore } from '@/stores/NotificationStore'
import { FlashMessageIconEnum } from '@/models/enums/FlashMessageIconEnum'
import { FlashMessageColorEnum } from '@/models/enums/FlashMessageColorEnum'

const { t } = useI18n()
const assetStore = useAssetStore()
const notificationStore = useNotificationStore()

/**
 * Add a new empty private holding to the asset map and list
 */
async function newPrivateHoldingAction() {
  // Hide the modal underlay, no matter what creation will be fired
  hideModalUnderlay()

  const request = {
    assetType: AssetTypeEnum.STOCK,
    pricePerUnit: 0.0,
    currency: CurrencyEnum.EUR,
    ownedQuantity: 0,
    unitType: UnitTypeEnum.PIECE,
    targetPercentage: 0.0,
    title: t('assetList.listEntries.privateHolding.defaultName'),
  } as PrivateHoldingRequest

  await getAuthorizedInstance().then((instance) => {
    return instance
      .post<PrivateHoldingRequest, AxiosResponse>(
        '/holding_api/asset_holding/private',
        request
      )
      .then((result) => {
        addPrivateHoldingToPool(assetStore, result.data)
        addPrivateHoldingToRenderList(assetStore, result.data)
      })
      .catch((error) => {
        switch (error.response.status) {
          case 409:
            // Get the reactive flash message object
            const flashMessage = notificationStore.flashMessage
            // Set the flash message properties
            flashMessage.icon = FlashMessageIconEnum.WARNING
            flashMessage.color = FlashMessageColorEnum.WARNING
            flashMessage.text = t('flashMessages.assetList.409')
            flashMessage.showFlag = true
            break
          default:
            console.log(
              'SearchbarFooter.vue no status case ' + error.response.status
            )
            break
        }
      })
  })
}

/**
 * Add a new empty holding group to the asset map and list
 */
async function newHoldingGroup() {
  // Hide the modal underlay, no matter what creation will be fired
  hideModalUnderlay()

  const request = {
    publicHoldingUuids: [],
    privateHoldingUuids: [],
    groupName: t('assetList.listEntries.holdingGroup.defaultName'),
    targetPercentage: 0,
  } as HoldingGroupRequest

  await getAuthorizedInstance().then((instance) => {
    return instance
      .post<HoldingGroup>('/holding_api/asset_holding/group', request)
      .then((result) => addHoldingGroup(assetStore, result.data))
      .catch((error) => {
        switch (error.response.status) {
          default:
            console.log(
              'SearchbarFooter.vue no status case ' + error.response.status
            )
            break
        }
      })
  })
}
</script>

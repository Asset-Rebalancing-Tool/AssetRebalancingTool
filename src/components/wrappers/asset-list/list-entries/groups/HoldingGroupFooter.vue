<template>
  <footer>
    <div class="footer-header">
      <button
        v-show="!editGroupFlagFlag && !deleteHoldingGroupFlag"
        @click.prevent="editGroup"
      >
        {{ $t('assetList.listEntries.holdingGroup.edit') }}
      </button>
      <button
        class="save"
        v-show="editGroupFlagFlag && !deleteHoldingGroupFlag"
        @click="
          PatchAssetService.patchHoldingGroup(
            patchHoldingGroupRequest(),
            group.uuid
          )
        "
      >
        {{ $t('assetList.listEntries.holdingGroup.save') }}
      </button>
      <button
        class="delete"
        v-show="deleteHoldingGroupFlag"
        @click="DeleteAssetService.deleteHoldingGroup(group.uuid)"
      >
        {{ $t('assetList.listEntries.holdingGroup.delete') }}
      </button>
      <h4 v-show="!editGroupFlagFlag">{{ groupName }}</h4>
      <input
        class="group-name-input"
        v-show="editGroupFlagFlag"
        type="text"
        v-model="groupName"
      />
    </div>

    <!-- empty columns -->
    <span></span>
    <span></span>

    <div class="current-value-wrapper">
      <p>{{ totalGroupValue }}</p>
      <p>{{ totalGroupPercentage }}</p>
    </div>

    <BaseInput
      ref="footerInput"
      :modelValue="targetPercentage"
      :class="{ error: groupTargetPercentageError }"
      :select-on-focus="true"
      @input="patchGroupTargetPercentage($event.target.value, group.uuid)"
    >
      <template #unit>
        <InputAnimation
          :execute-animation="showTargetPercentageAnim"
          :animation-wrapper="AnimationWrapperEnum.TARGET_PERCENTAGE"
        >
          <template #unit>
            <span v-show="!showTargetPercentageAnim">%</span>
          </template>
        </InputAnimation>
      </template>
    </BaseInput>

    <ThreeDigitValue :value-array="totalGroupDeviation" :unit="'%'">
      <template #arrow>
        <IconAssetRowArrow
          v-show="deviationExists"
          :arrow-up="deviationArrowDirection"
        />
      </template>
    </ThreeDigitValue>
  </footer>
</template>

<script lang="ts" setup>
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import InputAnimation from '@/components/inputs/InputAnimation.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import { useAssetStore } from '@/stores/AssetStore'
import { ref, computed, watch } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'
import PatchAssetService from '@/services/PatchAssetService'
import DeleteAssetService from '@/services/DeleteAssetService'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import { formatValueArray } from '@/composables/UsePriceRecords'
import { AnimationWrapperEnum } from '@/models/enums/AnimationWrapperEnum'
import {
  getTotalGroupValue,
  getTotalGroupPercentage,
  getTotalGroupDeviation,
} from '@/composables/UseTotalValues'

/**-***************************************************-**/
/** ----------- Props And Store Declaration ----------- **/
/**-***************************************************-**/

const assetStore = useAssetStore()
const props = defineProps({
  uuid: {
    type: String,
    required: true,
  },
})

const group: ComputedRef<HoldingGroup> = computed(() => {
  return assetStore.getAssetPoolEntryByUuid(props.uuid) as HoldingGroup
})

/**-***************************************************-**/
/** --------------- Input Model Values ---------------- **/
/**-***************************************************-**/

// The input model values itself
const groupName: Ref<string> = ref(group.value.groupName)
const targetPercentage: Ref<number> = ref(group.value.targetPercentage)

// bool that indicates if the group is currently editable or not
const editGroupFlagFlag = computed(() => assetStore.editFlag)
const deleteHoldingGroupFlag = computed(
  () => assetStore.deleteFlag
)

/**-***************************************************-**/
/** ---------------- Error Class Flags ---------------- **/
/**-***************************************************-**/

// bool that indicates if input error class should be rendered
const groupTargetPercentageError: Ref<boolean> = ref(false)

/**-***************************************************-**/
/** ------------- Input Animation Status -------------- **/
/**-***************************************************-**/

// The groups target percentage patch status (needed for animation)
const showTargetPercentageAnim: Ref<boolean> = ref(false)

// Execute the input's check animation for a specified field
function executeAnimation(field: Ref<boolean>) {
  setTimeout(() => {
    field.value = true
    setTimeout(() => {
      field.value = false
    }, 1000)
  }, 500)
}

/**-***************************************************-**/
/** --------------- Template Actions ------------------ **/
/**-***************************************************-**/

// Start editing a group
function editGroup(): void {
  assetStore.listActionState.deleteFlag = false
  assetStore.listActionState.editFlag = true
  assetStore.listActionState.selectedGroup = group.value
}

/**-***************************************************-**/
/** -------------- Input Patch Methods ---------------- **/
/**-***************************************************-**/

// Patch the public holdings target percentage
function patchGroupTargetPercentage(inputValue: string, groupUuid: string) {
  targetPercentage.value = +inputValue
  const request = patchGroupTargetPercentageRequest(inputValue)
  if (!groupTargetPercentageError.value) {
    PatchAssetService.patchHoldingGroup(request, groupUuid)
    executeAnimation(showTargetPercentageAnim)
  }
}

/**-***************************************************-**/
/** ------------- Input Patch Requests ---------------- **/
/**-***************************************************-**/

// Patch the whole holding group
function patchHoldingGroupRequest(): HoldingGroupRequest {
  resetSelectionState()
  if (groupName.value === '') {
    groupName.value = 'Meine Gruppe 1'
  }
  return { groupName: groupName.value } as HoldingGroupRequest
}

// Patch the groups target percentage
function patchGroupTargetPercentageRequest(
  percentage: string
): HoldingGroupRequest {
  resetSelectionState()
  groupTargetPercentageError.value = !+percentage
  return { targetPercentage: +percentage } as HoldingGroupRequest
}

// Reset the store's selection state in order to deactivate group editing
function resetSelectionState() {
  assetStore.listActionState.editFlag = false
  assetStore.listActionState.selectedGroup = null
}

/**-***************************************************-**/
/** ---------- Computed Template Properties ----------- **/
/**-***************************************************-**/

// Get the total asset list value
const totalGroupValue = computed(() => {
  const totalGroupValue: number = getTotalGroupValue(group.value.uuid)
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(totalGroupValue)
})

// Get the total asset list percentage
const totalGroupPercentage = computed(() => {
  const totalGroupPercentage = getTotalGroupPercentage(group.value.uuid)
  return (
    new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(
      totalGroupPercentage
    ) + ' %'
  )
})

// Get the total asset list deviation
const totalGroupDeviation = computed(() => {
  const totalGroupDeviation = getTotalGroupDeviation(group.value.uuid)
  return totalGroupDeviation
    ? formatValueArray(totalGroupDeviation)
    : ['00', '00', '0']
})

/**-***************************************************-**/
/** ---------- Deviation Computed Properties ---------- **/
/**-***************************************************-**/

// Get the deviation of the desired target percentage
const deviationArrowDirection = computed(() => {
  const totalGroupPercentage = getTotalGroupPercentage(group.value.uuid)
  return totalGroupPercentage < targetPercentage.value
})

const deviationExists = computed(() => {
  const totalGroupPercentage = getTotalGroupPercentage(group.value.uuid)
  return totalGroupPercentage !== targetPercentage.value
})
</script>

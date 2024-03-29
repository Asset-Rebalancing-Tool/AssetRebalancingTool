<template>
  <footer>
    <div class="footer-header">
      <button
        v-show="!editGroupFlag && !deleteHoldingGroupFlag"
        @click.prevent="editGroup"
      >
        {{ $t('assetList.listEntries.holdingGroup.edit') }}
      </button>
      <button
        class="save"
        v-show="editGroupFlag && !deleteHoldingGroupFlag"
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
      <h4 v-show="!editGroupFlag">{{ groupName }}</h4>
      <input
        class="group-name-input"
        v-show="editGroupFlag"
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
      custom-container-class="group-target-percentage-input"
      :select-on-focus="true"
      @input="patchGroupTargetPercentage($event.target.value, group.uuid)"
      @mouseover="hoverGroupTargetPercentage = true"
      @mouseleave="hoverGroupTargetPercentage = false"
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

    <ThreeDigitValue
      :value-array="totalGroupDeviation"
      :unit="'%'"
      @mouseover="hoverGroupDeviation = true"
      @mouseleave="hoverGroupDeviation = false"
    >
      <template #arrow>
        <IconAssetRowArrow
          v-show="deviationExists"
          :arrow-up="deviationArrowDirection"
        />
        <GroupDeviationTooltip
          :hover="hoverGroupDeviation"
          :deviation="rawGroupDeviation"
          :deviation-direction="deviationDirection"
        />
      </template>
    </ThreeDigitValue>

    <GroupTargetPercentageTooltip :hover="hoverGroupTargetPercentage" />
  </footer>
</template>

<script lang="ts" setup>
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import InputAnimation from '@/components/inputs/InputAnimation.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import { useAssetStore } from '@/stores/AssetStore'
import { ref, computed } from 'vue'
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
import { useI18n } from 'vue-i18n'
import GroupTargetPercentageTooltip from '@/components/wrappers/asset-list/tooltips/GroupTargetPercentageTooltip.vue'
import GroupDeviationTooltip from '@/components/wrappers/asset-list/tooltips/GroupDeviationTooltip.vue'

/**-***************************************************-**/
/** ----------- Props And Store Declaration ----------- **/
/**-***************************************************-**/

const { t } = useI18n()
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
const hoverGroupTargetPercentage: Ref<boolean> = ref(false)
const hoverGroupDeviation: Ref<boolean> = ref(false)

// bool that indicates if the group is currently editable or not
const editGroupFlag: ComputedRef<boolean> = computed(() => {
  if (!assetStore.listActionState.selectedGroup) {
    return false
  }

  if (
    assetStore.listActionState.editFlagUngrouped &&
    props.uuid === assetStore.listActionState.selectedGroup.uuid
  ) {
    return assetStore.listActionState.editFlagUngrouped
  }
  return false
})
const deleteHoldingGroupFlag = computed(() => assetStore.deleteFlag)

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
  assetStore.listActionState.editFlagUngrouped = true
  assetStore.listActionState.selectedGroup = group.value
}

/**-***************************************************-**/
/** -------------- Input Patch Methods ---------------- **/
/**-***************************************************-**/

// Patch the public assets target percentage
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
    groupName.value = t('assetList.listEntries.holdingGroup.defaultName')
  }
  return { groupName: groupName.value } as HoldingGroupRequest
}

// Patch the groups target percentage
function patchGroupTargetPercentageRequest(
  percentage: string
): HoldingGroupRequest {
  resetSelectionState()
  groupTargetPercentageError.value = !+percentage
  if (groupName.value === '') {
    groupName.value = t('assetList.listEntries.holdingGroup.defaultName')
  }
  return {
    groupName: groupName.value,
    targetPercentage: +percentage,
  } as HoldingGroupRequest
}

// Reset the store's selection state in order to deactivate group editing
function resetSelectionState() {
  assetStore.listActionState.editFlagUngrouped = false
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

const rawGroupPercentage = computed(() =>
  getTotalGroupPercentage(group.value.uuid)
)

// Get the total asset list percentage
const totalGroupPercentage = computed(() => {
  return (
    new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(
      rawGroupPercentage.value
    ) + ' %'
  )
})

const rawGroupDeviation = computed(
  () => +Number(getTotalGroupDeviation(group.value.uuid)).toFixed(2)
)

const deviationDirection = computed(
  () => rawGroupPercentage.value > targetPercentage.value
)

// Get the total asset list deviation
const totalGroupDeviation = computed(() => {
  return rawGroupDeviation.value
    ? formatValueArray(rawGroupDeviation.value)
    : ['00', '00', '0']
})

/**-***************************************************-**/
/** ---------- Deviation Computed Properties ---------- **/
/**-***************************************************-**/

// Get the deviation of the desired target percentage
const deviationArrowDirection = computed(() => {
  const totalGroupPercentage = getTotalGroupPercentage(group.value.uuid)
  return totalGroupPercentage > targetPercentage.value
})

const deviationExists = computed(() => {
  const totalGroupPercentage = getTotalGroupPercentage(group.value.uuid)
  return totalGroupPercentage !== targetPercentage.value
})
</script>

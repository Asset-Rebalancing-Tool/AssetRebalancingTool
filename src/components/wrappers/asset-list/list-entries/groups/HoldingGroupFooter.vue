<template>
  <footer>
    <div class="footer-header">
      <button v-show="!editGroupEntries" @click.prevent="editGroup">
        Bearbeiten
      </button>
      <button
        class="save"
        v-show="editGroupEntries"
        @click="
          PatchAssetService.patchHoldingGroup(
            patchHoldingGroupRequest(),
            holding.uuid
          )
        "
      >
        Speichern
      </button>

      <h4 v-show="!editGroupEntries">{{ groupName }}</h4>

      <input
        class="group-name-input"
        v-show="editGroupEntries"
        type="text"
        v-model="groupName"
        @input="writeGroupName($event.target.value)"
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
      @input="patchGroupTargetPercentage($event.target.value, holding.uuid)"
    >
      <template #unit>
        <InputAnimation :input-status="targetPercentageStatus">
          <template #unit>
            <span v-show="checkStatus(targetPercentageStatus)">%</span>
          </template>
        </InputAnimation>
      </template>
    </BaseInput>

    <ThreeDigitValue :value-array="totalGroupDeviation" :unit="'%'">
      <template #arrow>
        <IconAssetRowArrow />
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
import {ref, computed, watch} from 'vue'
import type { Ref, PropType } from 'vue'
import type { HoldingGroupRequest } from '@/requests/HoldingGroupRequest'
import PatchAssetService from '@/services/PatchAssetService'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'
import { formatValueArray } from '@/composables/UsePriceRecords'
import { InputStatusEnum } from '@/models/enums/InputStatusEnum'

/**-***************************************************-**/
/** ----------- Props And Store Declaration ----------- **/
/**-***************************************************-**/

const store = useAssetStore()
const props = defineProps({
  holding: {
    type: Object as PropType<HoldingGroup>,
    required: true,
  },
})

/**-***************************************************-**/
/** --------------- Input Model Values ---------------- **/
/**-***************************************************-**/

// Group related holdings
const publicHoldingUuids: Ref<string[]> = ref([])
const privateHoldingUuids: Ref<string[]> = ref([])

// The input model values itself
const groupName: Ref<string> = ref(props.holding.groupName)
const targetPercentage: Ref<number> = ref(props.holding.targetPercentage)

// bool that indicates if the group is currently editable or not
const editGroupEntries = computed(() => store.selectionState.editGroupEntries)

/**-***************************************************-**/
/** ---------------- Error Class Flags ---------------- **/
/**-***************************************************-**/

// bool that indicates if input error class should be rendered
let groupTargetPercentageError: Ref<boolean> = ref(false)

/**-***************************************************-**/
/** ------------- Input Animation Status -------------- **/
/**-***************************************************-**/

// The groups target percentage patch status (needed for animation)
const targetPercentageStatus: Ref<InputStatusEnum> = computed(() => {
  return store.listState.inputStatusIcon
})

// Check if the status of an input is none in order to show the unit slot
function checkStatus(status: InputStatusEnum) {
  return status === InputStatusEnum.NONE
}

/**-***************************************************-**/
/** -------- Watch Props For Reactive Template -------- **/
/**-***************************************************-**/

// Watch the target percentage prop in order to update the template after patch request response
watch(() => props.holding.targetPercentage, (percentage: number) => {
  targetPercentage.value = percentage
});

/**-***************************************************-**/
/** --------------- Template Actions ------------------ **/
/**-***************************************************-**/

// Start editing a group
function editGroup(): void {
  store.selectionState.editGroupEntries = true
  store.selectionState.groupUuid = props.holding.uuid
}

// Update the groupName value on each keyup
function writeGroupName(name: string) {
  groupName.value = name
}

/**-***************************************************-**/
/** -------------- Input Patch Methods ---------------- **/
/**-***************************************************-**/

// Patch the public holdings target percentage
function patchGroupTargetPercentage(inputValue: string, groupUuid: string) {
  let request = patchGroupTargetPercentageRequest(inputValue)
  if (!groupTargetPercentageError.value) {
    PatchAssetService.patchHoldingGroup(request, groupUuid)
  }
}

/**-***************************************************-**/
/** ------------- Input Patch Requests ---------------- **/
/**-***************************************************-**/

// Patch the whole holding group
function patchHoldingGroupRequest(): HoldingGroupRequest {
  resetSelectionState()
  return {
    groupName: groupName.value,
    publicHoldingUuids: publicHoldingUuids.value,
    privateHoldingUuids: privateHoldingUuids.value,
  } as HoldingGroupRequest
}

// Patch the groups target percentage
function patchGroupTargetPercentageRequest(percentage: string): HoldingGroupRequest {
  resetSelectionState()
  groupTargetPercentageError.value = !+percentage
  return { targetPercentage: +percentage } as HoldingGroupRequest
}

// Reset the store's selection state in order to deactivate group editing
function resetSelectionState() {
  store.selectionState.editGroupEntries = false
  store.selectionState.groupUuid = null
}

/**-***************************************************-**/
/** ---------- Computed Template Properties ----------- **/
/**-***************************************************-**/

// Get the total asset list value
const totalGroupValue = computed(() => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(store.listState.totalAssetListValue)
})

// Get the total asset list percentage
const totalGroupPercentage = computed(() => {
  return (
    new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(
      store.listState.totalAssetListPercentage
    ) + ' %'
  )
})

// Get the total asset list deviation
const totalGroupDeviation = computed(() => {
  return formatValueArray(store.listState.totalAssetListDeviation)
})
</script>

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
      @input="
        PatchAssetService.patchHoldingGroup(
          patchGroupTargetPercentageRequest($event.target.value),
          holding.uuid
        )
      "
    >
      <template #unit>
        <InputAnimation :input-status="targetPercentageStatus">
          <span>%</span>
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
import { ref, computed } from 'vue'
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

const publicHoldingUuids: Ref<string[]> = ref([])
const privateHoldingUuids: Ref<string[]> = ref([])

const targetPercentage: Ref<number> = ref(props.holding.targetPercentage)
const targetPercentageStatus: Ref<InputStatusEnum> = ref(
  store.listState.inputStatusIcon
)

// reactive group name model value
const groupName: Ref<string> = ref(props.holding.groupName)

// bool that indicates if the group is currently editable or not
const editGroupEntries = computed(() => store.selectionState.editGroupEntries)

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
/** -------------- Input Patch Requests --------------- **/
/**-***************************************************-**/

// Patch the whole holding group
function patchHoldingGroupRequest(): HoldingGroupRequest {
  store.selectionState.editGroupEntries = false
  store.selectionState.groupUuid = null
  return {
    groupName: groupName.value,
    publicHoldingUuids: publicHoldingUuids.value,
    privateHoldingUuids: privateHoldingUuids.value,
  } as HoldingGroupRequest
}

// Patch the groups target percentage
function patchGroupTargetPercentageRequest(
  percentage: number
): HoldingGroupRequest {
  store.selectionState.editGroupEntries = false
  store.selectionState.groupUuid = null
  return { targetPercentage: percentage } as HoldingGroupRequest
}
</script>

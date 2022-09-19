<template>
  <footer>

    <div class="footer-header">
      <button v-show="!editGroupEntries" @click.prevent="editGroup">Bearbeiten</button>
      <button class="save" v-show="editGroupEntries" @click="
        PatchAssetService.patchHoldingGroup(
          patchHoldingGroupRequest(),
          holding.uuid
        )"
      >Speichern</button>

      <h4 v-show="!editGroupEntries">{{ holding.groupName }}</h4>

      <input
          class="group-name-input"
          v-show="editGroupEntries"
          type="text"
          :value="holding.groupName"
      />
    </div>


    <!-- empty columns -->
    <span></span>
    <span></span>

    <div class="current-value-wrapper">
      <p>10.642,59 €</p>
      <p>66,84 %</p>
    </div>

    <BaseInput ref="footerInput">
      <template #unit>
        <span>%</span>
      </template>
    </BaseInput>

    <ThreeDigitValue :value-array="testDeviation" :unit="'%'">
      <template #arrow>
        <IconAssetRowArrow />
      </template>
    </ThreeDigitValue>
  </footer>
</template>

<script lang="ts" setup>
import ThreeDigitValue from '@/components/data/ThreeDigitValue.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import IconAssetRowArrow from '@/assets/icons/IconAssetRowArrow.vue'
import { useAssetStore } from '@/stores/AssetStore';
import { ref, computed } from 'vue';
import type { Ref, PropType } from 'vue';
import type { HoldingGroupRequest } from "@/requests/HoldingGroupRequest";
import PatchAssetService from "@/services/PatchAssetService";
import type { HoldingGroup } from "@/models/holdings/HoldingGroup";

const testDeviation = ['08', '16', '0']

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
/** ------- Computed Properties And Methods ----------- **/
/**-***************************************************-**/

const editGroupEntries = computed(() => store.selectionState.editGroupEntries)

function editGroup(this: any): void {
  store.selectionState.editGroupEntries = true
}

// The owned quantity request body
function patchHoldingGroupRequest(): HoldingGroupRequest {
  store.selectionState.editGroupEntries = false
  return { groupName: props.holding.groupName } as HoldingGroupRequest
}

</script>

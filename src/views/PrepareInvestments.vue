<template>
  <section class="content">

    <BaseInput
        type="number"
        :modelValue="deposit"
        :class="{ error: depositError }"
        :select-on-focus="true"
        @input="calculateDistribution($event.target.value)"
    />

    <UnderConstruction
      :construction-title="$t('underConstruction.scheduleTab.title')"
      :construction-text="$t('underConstruction.scheduleTab.text')"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import UnderConstruction from '@/components/wrappers/UnderConstruction.vue'
import { useI18n } from 'vue-i18n'
import BaseInput from "@/components/inputs/BaseInput.vue";
const { t } = useI18n()

const deposit: Ref<number> = ref(0)
const depositError: Ref<boolean> = ref(false)

function calculateDistribution(inputValue: string) {
  deposit.value = +inputValue
  if (!depositError.value) {



  }
}

</script>

<template>
  <section class="content">
    <UnderConstruction
        :construction-title="$t('underConstruction.transactionTab.title')"
        :construction-text="$t('underConstruction.transactionTab.text')"
    />
  </section>
</template>

<script lang="ts" setup>
import UnderConstruction from '@/components/wrappers/UnderConstruction.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

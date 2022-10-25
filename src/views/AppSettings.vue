<template>
  <section id="settings">
    <label class="app-locale" for="locale">
      <span>{{ $t('settings.localeLable') }}:</span>
      <BaseSelect
          id="locale"
          :options="localeOptions"
          :default-selection="$i18n.locale"
          :modelValue="$i18n.locale"
          @change="setLocale($event.target.value)"
      />
    </label>
    <label class="default-currency" for="default-currency">
      <span>{{ $t('settings.defaultCurrency') }}:</span>
      <BaseSelect
          id="default-currency"
          :options="currencyOptions"
          :default-selection="CurrencyEnum.EUR"
          :modelValue="defaultCurrency"
      />
    </label>
  </section>
</template>

<script lang="ts" setup>
import {allLocales, createLocaleObject, setLocale} from '@/i18n'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { CurrencyEnum } from "@/models/enums/CurrencyEnum";
import BaseSelect from '@/components/inputs/BaseSelect.vue'
import {computed, ref } from "vue";
import type { Ref } from "vue";
import {createCurrencyObject} from "@/composables/UseCurrency";

// The default account currency that is
const defaultCurrency: Ref<CurrencyEnum> = ref(CurrencyEnum.EUR)

// Get the currency select options
const localeOptions = computed(
    () => createLocaleObject(Object.values(allLocales))
)


// Get the currency select options
const currencyOptions = computed(
    () => createCurrencyObject(Object.values(CurrencyEnum))
)

</script>

<style lang="scss">
@import '@/assets/scss/views/settings.scss';
</style>

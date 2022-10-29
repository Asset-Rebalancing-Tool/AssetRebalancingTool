<template>
  <section id="settings">
    <div class="settings-container">
      <h2>{{ $t('settings.tabHeading') }}</h2>

      <h3>{{ $t('settings.email.heading') }}</h3>
      <div class="email-wrapper">
        <p>{{ $t('settings.email.changeText') }} <span>admin@mail.de</span></p>
        <p class="link">{{ $t('settings.email.changeLink') }}</p>
      </div>

      <h3>{{ $t('settings.password.heading') }}</h3>
      <div class="password-wrapper">
        <div class="input-wrapper">
          <label for="new-password">
            <span>{{ $t('settings.password.new') }}</span>
            <BaseInput id="new-password" placeholder="********" />
          </label>
          <label for="current-password">
            <span>{{ $t('settings.password.current') }}</span>
            <BaseInput id="current-password" placeholder="********" />
          </label>
        </div>
        <p class="reset-password">
          {{ $t('settings.password.resetText') }}
          <span>{{ $t('settings.password.resetLink') }}</span>
        </p>
        <button class="save-password">{{ $t('settings.password.save') }}</button>
      </div>


      <h3>{{ $t('settings.appSettings') }}</h3>
      <div class="app-settings-wrapper">
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
      </div>

      <h3>{{ $t('settings.appThemeColor') }}</h3>
      <div class="app-theme-wrapper">
        <div @click="mainStore.changeThemeColor(ThemeColorEnum.GREEN)" class="theme-color green"></div>
        <div @click="mainStore.changeThemeColor(ThemeColorEnum.BLUE)" class="theme-color blue"></div>
        <div @click="mainStore.changeThemeColor(ThemeColorEnum.ORANGE)" class="theme-color orange"></div>
        <div @click="mainStore.changeThemeColor(ThemeColorEnum.VIOLETTE)" class="theme-color violette"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { allLocales, createLocaleObject, setLocale } from '@/i18n'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { CurrencyEnum } from "@/models/enums/CurrencyEnum"
import BaseSelect from '@/components/inputs/BaseSelect.vue'
import {computed, ref } from "vue";
import type { Ref } from "vue";
import {createCurrencyObject} from "@/composables/UseCurrency"
import BaseInput from '@/components/inputs/BaseInput.vue'
import { ThemeColorEnum } from "@/models/enums/ThemeColorEnum";
import { useMainStore } from "@/stores/MainStore";

const mainStore = useMainStore()

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

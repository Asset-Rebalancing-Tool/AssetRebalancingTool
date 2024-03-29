import en from '@/assets/locales/en.json'
import de from '@/assets/locales/de.json'
// @ts-ignore
import { createI18n } from 'vue-i18n'
import type { Locales } from '@/models/enums/Locales'
import { CurrencyEnum as CurrencyEnumType } from '@/models/enums/CurrencyEnum'
import { getCurrencyValue } from '@/composables/UseCurrency'

export const allLocales: string[] = ['de', 'en']

// Create Vue I18n instance.
export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'de',
  fallbackLocale: 'en',
  messages: {
    en: en,
    de: de,
  },
})

// Set new locale.
export async function setLocale(locale: Locales) {
  // Load locale if not available yet.
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await loadLocale(locale)
    // fetch() error occurred.
    if (messages === undefined) {
      return
    }
    // Add locale.
    i18n.global.setLocaleMessage(locale, messages)
  }
  // Set locale.
  i18n.global.locale.value = locale
}

// Fetch locale.
function loadLocale(locale: Locales) {
  return fetch(`./locales/${locale}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Something went wrong!')
    })
    .catch((error) => {
      switch (error.response.status) {
        default:
          console.log(
            'FetchAssetService.ts no status case ' + error.response.status
          )
          break
      }
    })
}

/**
 * Create an object based on all locales, in order to use it in the BaseSelect.vue component
 *
 * @param localeArray string[]
 */
export function createLocaleObject(localeArray: string[]) {
  const tempArray: any = []
  for (const localeValue of localeArray) {
    tempArray.push({
      value: localeValue,
      text: localeValue,
    })
  }
  return tempArray
}

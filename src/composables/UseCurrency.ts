import type { CurrencyEnum as CurrencyEnumType } from '@/models/enums/CurrencyEnum'
import { CurrencyEnum } from '@/models/enums/CurrencyEnum'
import { i18n } from '@/i18n'

/**
 *
 * @param currencyArray
 */
export function createCurrencyObject(currencyArray: CurrencyEnumType[]) {
  const tempArray: any = []
  for (const currencyKey of currencyArray) {
    if (currencyKey == 'UNSUPPORTED') continue
    tempArray.push({
      value: currencyKey,
      text: getCurrencyValue(currencyKey),
    })
  }
  return tempArray
}

/**
 * Get a currency select option value translated by its key
 *
 * @param currencyKey CurrencyEnumType
 */
export function getCurrencyValue(currencyKey: CurrencyEnumType): string {
  const { t } = i18n.global
  return t(`assetList.listEntries.privateHolding.currencies.${currencyKey}`)
}

/**
 * Map the currency of a list entry to its symbol
 *
 * @param currency string
 */
export function mapCurrency(currency: CurrencyEnumType): string {
  switch (currency) {
    default:
    case CurrencyEnum.UNSUPPORTED:
      return '?'
    case CurrencyEnum.EUR:
      return '€'
    case CurrencyEnum.USD:
      return '$'
  }
}

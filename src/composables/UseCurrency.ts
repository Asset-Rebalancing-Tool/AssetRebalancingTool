import type { CurrencyEnum as CurrencyEnumType } from '@/models/enums/CurrencyEnum'
import { CurrencyEnum } from '@/models/enums/CurrencyEnum'

/**
 * Get an array of mapped currencies
 *
 * @param currencyArray CurrencyEnum[]
 */
export function mapCurrencyArray(currencyArray: CurrencyEnumType[]) {
  const tempArray = []
  for (const currency of currencyArray) {
    tempArray.push(mapCurrency(currency))
  }
  return tempArray
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


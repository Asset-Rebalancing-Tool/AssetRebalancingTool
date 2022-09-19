import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'

/**
 * Map an array of currencies
 *
 * @param currencyArray CurrencyEnum[]
 */
export function mapCurrencyArray(currencyArray: CurrencyEnum[]) {
  const tempArray = []
  for (const currency of currencyArray) {
    tempArray.push(mapCurrency(currency))
  }
  return tempArray
}

/**
 * Map the currency of an assets to its symbol
 * TODO: user configurable
 *
 * @param currency CurrencyEnum
 */
export function mapCurrency(currency: CurrencyEnum): string {
  switch (currency) {
    default:
    case 'UNSUPPORTED':
      return '?'
    case 'EUR':
      return '€'
    case 'USD':
      return '$'
  }
}

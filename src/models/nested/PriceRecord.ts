import type { CurrencyEnum } from '@/models/enums/CurrencyEnum'

export interface PriceRecord {
  price: number
  tsPrice: string
  currency: CurrencyEnum
}

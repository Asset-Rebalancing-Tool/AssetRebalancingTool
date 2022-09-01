import type { CurrencyEnum } from "@/models/enums/CurrencyEnum";

export interface IPriceRecord {
  price: number
  tsPrice: string
  currency: CurrencyEnum
}

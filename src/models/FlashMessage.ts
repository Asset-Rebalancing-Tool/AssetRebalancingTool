import type { FlashMessageColorEnum } from '@/models/enums/FlashMessageColorEnum'
import type { FlashMessageIconEnum } from '@/models/enums/FlashMessageIconEnum'

export interface FlashMessage {
  showFlag: boolean
  text: string
  color: FlashMessageColorEnum
  icon: FlashMessageIconEnum
}

import type { FlashMessageColorEnum } from '@/models/enums/FlashMessageColorEnum'
import type { FlashMessageIconEnum } from '@/models/enums/FlashMessageIconEnum'

export interface FlashMessage {
  showFlashMessage: boolean
  flashMessageText: string
  flashMessageColor: FlashMessageColorEnum
  flashMessageIcon: FlashMessageIconEnum
}

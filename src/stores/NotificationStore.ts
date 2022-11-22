import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { FlashMessage } from '@/models/FlashMessage'
import { FlashMessageColorEnum } from '@/models/enums/FlashMessageColorEnum'
import { FlashMessageIconEnum } from '@/models/enums/FlashMessageIconEnum'

export const useNotificationStore = defineStore('notificationStore', () => {
  // The reactive flash message object
  let flashMessage: FlashMessage = reactive({
    showFlag: false,
    text: '',
    color: FlashMessageColorEnum.WARNING,
    icon: FlashMessageIconEnum.WARNING,
  })

  /**
   * Reset the whole flash message object
   *
   * @return void
   */
  function resetFlashMessage(): void {
    flashMessage = {
      showFlag: false,
      text: '',
      color: FlashMessageColorEnum.WARNING,
      icon: FlashMessageIconEnum.WARNING,
    } as FlashMessage
  }

  return { flashMessage, resetFlashMessage }
})

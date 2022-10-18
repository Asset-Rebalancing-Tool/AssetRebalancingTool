import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { FlashMessage } from '@/models/FlashMessage'
import { FlashMessageColorEnum } from '@/models/enums/FlashMessageColorEnum'
import { FlashMessageIconEnum } from '@/models/enums/FlashMessageIconEnum'

export const useFlashMessageStore = defineStore('flashMessageStore', () => {

  // The reactive flash message object
  const flashMessage: FlashMessage = reactive({
    showFlashMessage: false,
    flashMessageText: '',
    flashMessageColor: FlashMessageColorEnum.WARNING,
    flashMessageIcon: FlashMessageIconEnum.WARNING,
  })

  return { flashMessage }
})

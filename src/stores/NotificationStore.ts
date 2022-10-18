import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { FlashMessage } from '@/models/FlashMessage'
import { FlashMessageColorEnum } from '@/models/enums/FlashMessageColorEnum'
import { FlashMessageIconEnum } from '@/models/enums/FlashMessageIconEnum'

export const useNotificationStore = defineStore('notificationStore', () => {
  // The reactive flash message object
  const flashMessage: FlashMessage = reactive({
    showFlag: false,
    text: '',
    color: FlashMessageColorEnum.WARNING,
    icon: FlashMessageIconEnum.WARNING,
  })

  return { flashMessage }
})

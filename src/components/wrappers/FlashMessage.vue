<template>
  <div
    class="flash-message-container"
    :style="{ borderLeft: `5px solid ${color}` }"
  >
    <div class="icon-wrapper" :style="{ backgroundColor: color }">
      <Component :is="icon" />
    </div>
    <p>{{ text }}</p>
    <div class="close" @click="closeFlashMessage">
      <IconCloseFlashMessage />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/NotificationStore'
import IconCloseFlashMessage from '@/assets/icons/flash-message/IconCloseFlashMessage.vue'
import { FlashMessageIconEnum } from '@/models/enums/FlashMessageIconEnum'
import IconWarning from '@/assets/icons/flash-message/IconWarning.vue'

const notificationStore = useNotificationStore()

const color = computed(() => {
  return notificationStore.flashMessage.color
})

const icon = computed(() => {
  return notificationStore.flashMessage.icon
})

const text = computed(() => {
  return notificationStore.flashMessage.text
})

const closeFlashMessage = computed(() => {
  return (notificationStore.flashMessage.showFlag = false)
})
</script>

<style lang="scss">
@import '@/assets/scss/wrappers/flash-message.scss';
</style>

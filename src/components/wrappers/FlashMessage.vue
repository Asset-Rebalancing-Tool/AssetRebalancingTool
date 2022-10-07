<template>
  <div
    class="flash-message-container"
    :style="{ borderLeft: `5px solid ${flashMessageColor}` }"
  >
    <div class="icon-wrapper" :style="{ backgroundColor: flashMessageColor }">
      <Component :is="flashMessageIcon" />
    </div>
    <p>{{ flashMessageText }}</p>
    <div class="close" @click="closeFlashMessage">
      <IconCloseFlashMessage />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useFlashMessageStore } from '@/stores/FlashMessageStore'
import IconCloseFlashMessage from '@/assets/icons/flash-message/IconCloseFlashMessage.vue'

const store = useFlashMessageStore()

const flashMessageColor = computed(() => {
  return store.flashMessage.flashMessageColor
})

const flashMessageIcon = computed(() => {
  return store.flashMessage.flashMessageIcon
})

const flashMessageText = computed(() => {
  return store.flashMessage.flashMessageText
})

const closeFlashMessage = computed(() => {
  return (store.flashMessage.showFlashMessage = false)
})
</script>

<style lang="scss">
@import '@/assets/scss/wrappers/flash-message.scss';
</style>

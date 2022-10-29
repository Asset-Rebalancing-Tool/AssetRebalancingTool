import { defineStore } from 'pinia'
import { ref, computed } from "vue";
import type { Ref, ComputedRef } from "vue";
import { ThemeColorEnum } from "@/models/enums/ThemeColorEnum";

export const useMainStore = defineStore('mainStore', () => {

  // Bool that indicates if the sidebar should be rendered
  const showSidebar: Ref<boolean> = ref(localStorage.getItem('token') !== null)

  // The app's theme color
  const themeColor: Ref<ThemeColorEnum> = ref(ThemeColorEnum.GREEN)
  const getThemeColor: ComputedRef<ThemeColorEnum> = computed(
      () => themeColor.value
  )


  /**
   * Change the selected theme color
   *
   * @param color ThemeColorEnum
   *
   * @return void
   */
  function changeThemeColor(color: ThemeColorEnum): void {
    themeColor.value = color
  }

  return { showSidebar, getThemeColor, changeThemeColor }
})

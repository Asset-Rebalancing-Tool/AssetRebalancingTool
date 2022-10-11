<template>
  <div class="language-container">
    <span>{{ $t('authorization.texts.selectedLanguage') }}</span>
    <div class="link-wrapper">
      <span
          class="language-link"
          @click="toggleLanguageWrapper"
      >{{ $t(`locales.${i18n.global.locale.value}`) }}
      </span>
      <div class="language-wrapper" v-show="showLanguageWrapper">
        <div
            class="language"
            v-for="locale in allLocales"
            :lang="locale"
            :class="isSelectedLanguage(locale)"
            @click="selectLanguage(locale)"
        >{{ locale }}</div>
      </div>
    </div>
    <IconLanguage />
  </div>
</template>

<script lang="ts" setup>
import IconLanguage from '@/assets/icons/IconLanguage.vue'
import { i18n, allLocales, setLocale } from "@/i18n";
import { ref} from "vue";
import type { Ref } from "vue";
import type { Locales } from '@/models/enums/Locales'

const showLanguageWrapper: Ref<boolean> = ref(false)

function toggleLanguageWrapper() {
  showLanguageWrapper.value = !showLanguageWrapper.value
}

function isSelectedLanguage(locale: string) {
  return (locale === i18n.global.locale.value) ? 'selected' : ''
}

function selectLanguage(locale: string) {
  let langauge: Locales = locale as Locales
  setLocale(langauge)
  showLanguageWrapper.value = false
}
</script>

<style lang="scss" scoped>
.language-container {
  @include flex-center-xy;
  column-gap: 5px;
  margin-top: 15px;

  span {
    color: $secondary-text-color;
    line-height: 15px;
  }

  .link-wrapper {
    position: relative;
  }

  svg {
    width: 15px;
    height: 15px;
    margin-top: 3px;
  }

  .link-wrapper {
    position: relative;

    .language-link {
      color: $main-color;
      text-decoration: underline;
      cursor: pointer;
    }

    .language-wrapper {
      position: absolute;
      top: 30px;
      right: 0;
      width: 50px;
      border-radius: $primary-border-radius;
      border: 1px solid $passive-border-color;
      background-color: $secondary-background-color;

      .language {
        width: 100%;
        padding: 2px 0;
        cursor: pointer;
        text-align: center;
        border-top: 1px solid $passive-border-color;
        color: $primary-text-color;
      }

      .language:first-child {
        border: none;
        border-radius: $primary-border-radius $primary-border-radius 0 0;
      }

      .language:last-child {
        border-radius: 0 0 $primary-border-radius $primary-border-radius;
      }

      .language.selected {
        color: $main-color;
        background-color: $tertiary-background-color;
      }

      .language:hover:not(.language.selected:hover) {
        background-color: $main-color;
        color: $primary-text-color;
      }

      .language.selected:hover {
        cursor: default;
      }
    }
  }
}
</style>

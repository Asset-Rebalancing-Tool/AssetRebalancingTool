<template>
  <section class="content">
    <label>App Settings</label>
    <label for="locale">Locale: </label>
    <select
      :value="$i18n.locale"
      @change="setLocale($event.target.value)"
      id="locale"
    >
      <option v-for="locale in allLocales" :value="locale">{{ locale }}</option>
    </select>
  </section>
</template>

<script lang="ts" setup>
import { allLocales, setLocale } from '@/i18n'
</script>

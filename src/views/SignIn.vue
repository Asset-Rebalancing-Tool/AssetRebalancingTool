<template>
  <section id="sign-in">
    <div class="left-wrapper">
      <div class="app-logo"></div>
    </div>
    <div class="right-wrapper">
      <form class="sign-in-form">
        <h1>Anmelden</h1>
        <BaseInput :placeholder="'name@gmail.com'">
          <template #label>
            <label>E-Mail-Adresse</label>
          </template>
        </BaseInput>
        <BaseInput :placeholder="'********'">
          <template #label>
            <label>Passwort</label>
          </template>
          <template #inputIcon>
            <IconShowPassword v-show="true" />
            <IconHidePassword v-show="false" />
          </template>
        </BaseInput>
        <div class="form-spacing-wrapper">
          <BaseCheckbox label="Angemeldet bleiben für 30 Tage" />
          <RouterLink class="link" to="">Passwort vergessen?</RouterLink>
        </div>
        <button type="submit" @click.prevent="submitForm">Anmelden</button>
        <span class="change-entry-view"
          >Noch kein Konto?
          <RouterLink class="link" :to="{ name: 'SignUp' }"
            >Kostenlos registrieren</RouterLink
          >
        </span>
        <div class="divider-wrapper">
          <span></span>
          <span>oder</span>
          <span></span>
        </div>
        <button class="third-party-button" @click.prevent="submitForm">
          <IconGoogle />
          <span>Anmelden mit Google</span>
        </button>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import BaseInput from '@/components/inputs/BaseInput.vue'
import IconShowPassword from '@/assets/icons/inputs/IconShowPassword.vue'
import IconHidePassword from '@/assets/icons/inputs/IconHidePassword.vue'
import IconGoogle from '@/assets/icons/IconGoogle.vue'
import BaseCheckbox from '@/components/inputs/BaseCheckbox.vue'

function submitForm() {}
</script>

<style lang="scss">
@import '@/assets/scss/views/authorization-form.scss';
</style>

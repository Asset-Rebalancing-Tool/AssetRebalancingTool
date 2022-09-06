<template>
  <section id="sign-in">
    <div class="left-wrapper">
      <div class="app-logo"></div>
    </div>
    <div class="right-wrapper">
      <form class="sign-in-form">
        <h1>Kostenlos Registrieren</h1>
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
        <div class="form-spacing-wrapper"></div>
        <button type="submit" @click.prevent="submitForm"></button>
        <span class="change-entry-view"
          >Du hast schon ein Konto?
          <RouterLink class="link" :to="{ name: 'SignIn' }"
            >Hier Anmelden</RouterLink
          >
        </span>
        <div class="divider-wrapper">
          <span></span>
          <span>oder</span>
          <span></span>
        </div>
        <button class="third-party-button" @click.prevent="submitForm">
          <IconGoogle />
          <span>Registrieren mit Google</span>
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

<style lang="scss" scoped>
@import '@/assets/scss/views/authorization-form.scss';
</style>

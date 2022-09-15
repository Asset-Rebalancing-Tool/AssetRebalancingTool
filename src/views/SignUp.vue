<template>
  <section id="sign-up">
    <div class="left-wrapper">
      <div class="app-logo"></div>
    </div>
    <div class="right-wrapper">
      <form class="sign-in-form" @submit.prevent="onSubmit">
        <h1>Kostenlos Registrieren</h1>
        <BaseInput
            :placeholder="'name@gmail.com'"
            type="email"
            v-model="email"
            :error="emailError"
            required
        >
          <template #label>
            <label>E-Mail-Adresse</label>
          </template>
        </BaseInput>
        <BaseInput
            :placeholder="'********'"
            type="password"
            v-model="password"
            required
        >
          <template #label>
            <label>Passwort</label>
          </template>
          <template #inputIcon>
            <IconShowPassword v-show="true" />
            <IconHidePassword v-show="false" />
          </template>
        </BaseInput>
        <div class="form-spacing-wrapper">
          <div class="password-strength-wrapper">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <button type="submit">Kostenlos Registrieren</button>
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
        <button class="third-party-button">
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
import type { AuthRequest } from '@/requests/AuthRequest'
import { registerUser } from "@/services/TokenService";
import { ref } from "vue";
import type { Ref } from "vue";

/*const { value: email, errorMessage: emailError } = useField('email', function (inputValue: string) {
  if (!inputValue) return 'This field is required'
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!regex.test(String(inputValue).toLowerCase())) {
    return 'Please enter a valid email address'
  }
  return true
})*/

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')

function onSubmit() {
  const authRequest: AuthRequest = {
    email: email.value,
    password: password.value
  }
  registerUser(authRequest)
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/authorization-form.scss';
</style>

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
            :type="passwordType"
            v-model="password"
            @input="checkPasswordStrength($event.target.value)"
            required
        >
          <template #label>
            <label>Passwort</label>
          </template>
          <template #inputIcon>
            <IconShowPassword @click="toggleVisibility" v-show="!showPassword" />
            <IconHidePassword @click="toggleVisibility" v-show="showPassword" />
          </template>
        </BaseInput>
        <div class="form-spacing-wrapper">
          <div class="password-strength-wrapper">
            <span :class="{ 'strong' : passwordStrength >= 1 }"></span>
            <span :class="{ 'strong' : passwordStrength >= 2 }"></span>
            <span :class="{ 'strong' : passwordStrength >= 3 }"></span>
            <span :class="{ 'strong' : passwordStrength >= 4 }"></span>
            <span :class="{ 'strong' : passwordStrength >= 5 }"></span>
          </div>
          <span class="requirements">Mindestens 8 Zeichen und 1 Großbuchstabe</span>
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
import {computed, ref} from "vue";
import type { Ref } from "vue";

// input models
const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const showPassword: Ref<boolean> = ref(false)

// Render the input type in order to show or hide the input value
const passwordType = computed((): string => {
  return (showPassword.value) ? 'text' : 'password'
})

// On click show or hide password
function toggleVisibility() {
  showPassword.value = !showPassword.value
}

// Password strength indicator
const passwordStrength: Ref<number> = ref(0)

/**
 * Check the strength of the password input value
 *
 * @param passwordInput string
 */
function checkPasswordStrength(passwordInput: string) {
  passwordStrength.value = requirementsFulfilled(passwordInput)
}

/**
 * Check how many requirements are fulfilled
 *
 * @param passwordInput string
 *
 * @return number
 */
function requirementsFulfilled(passwordInput: string): number {
  let containsUpper = (/[A-Z]/.test(passwordInput))
  let length = passwordInput.length
  if (passwordInput === '') return 0
  if (containsUpper && length >= 14) return 5
  if (length >= 14) return 4
  if (containsUpper && length >= 12) return 4
  if (length >= 12) return 3
  if (containsUpper && length >= 10) return 3
  if (length >= 10) return 2
  if (containsUpper && length >= 8) return 2
  if (containsUpper || length >= 8) return 1
  return 0
}

/**
 * Registration form submit
 */
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

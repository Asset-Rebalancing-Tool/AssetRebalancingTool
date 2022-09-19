<template>
  <section id="sign-in">
    <div class="left-wrapper">
      <div class="app-logo"></div>
    </div>
    <div class="right-wrapper">
      <form class="sign-in-form" @submit.prevent="onSubmit">
        <h1>Anmelden</h1>
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
          :error="passwordError"
          required
        >
          <template #label>
            <label>Passwort</label>
          </template>
          <template #inputIcon>
            <IconShowPassword
              @click="toggleVisibility"
              v-show="!showPassword"
            />
            <IconHidePassword @click="toggleVisibility" v-show="showPassword" />
          </template>
        </BaseInput>
        <div class="form-spacing-wrapper">
          <BaseCheckbox label="Angemeldet bleiben für 30 Tage" />
          <RouterLink class="link" to="">Passwort vergessen?</RouterLink>
        </div>
        <button type="submit">Anmelden</button>
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
        <button class="third-party-button">
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
import type { AuthRequest } from '@/requests/AuthRequest'
import { loginUser } from '@/services/TokenService'
import { useField, useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'

const validations = {
  email: (value: any) => {
    if (!value) return 'This field is required'
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(String(value).toLowerCase())) {
      return 'Please enter a valid email address'
    }
    return true
  },
  password: (value: any) => {
    const requiredMessage = 'This field is required'
    if (value === undefined || value === null) return requiredMessage
    if (!String(value).length) return requiredMessage
    return true
  },
}
useForm({
  validationSchema: validations,
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const showPassword: Ref<boolean> = ref(false)

const passwordType = computed((): string => {
  return showPassword.value ? 'text' : 'password'
})

function toggleVisibility() {
  showPassword.value = !showPassword.value
}

function onSubmit() {
  const authRequest: AuthRequest = {
    email: email.value,
    password: password.value,
  }
  loginUser(authRequest)
}
</script>

<style lang="scss">
@import '@/assets/scss/views/authorization-form.scss';
</style>

<template>
  <section id="sign-in">
    <div class="left-wrapper">
      <div class="app-logo"></div>
    </div>
    <div class="right-wrapper">
      <form class="sign-in-form" @submit.prevent="onSubmit">
        <h1>Anmelden</h1>
        <BaseInput
            :class="{ 'error' : emailError }"
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
        <div class="error">{{ emailError }}</div>
        <BaseInput
            :class="{ 'error' : passwordError }"
            :placeholder="'********'"
            :type="passwordType"
            @input="checkPasswordLength($event.target.value)"
            v-model="password"
            :error="passwordError"
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
        <div class="error">{{ passwordError }}</div>
        <div class="form-spacing-wrapper">
          <BaseCheckbox label="Angemeldet bleiben für 30 Tage" />
          <RouterLink class="link" to="">Passwort vergessen?</RouterLink>
        </div>
        <button type="submit" :class="{ show: activeSubmitButton }">Anmelden</button>
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
import type { AuthRequest } from "@/requests/AuthRequest";
import { loginUser } from "@/services/TokenService";
import { useField, useForm  } from 'vee-validate'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'


const validations = {
  email: (inputValue: any): string | boolean => {

    // Requirements
    let isUndefined = inputValue === undefined || inputValue === null
    let isEmptyString = !String(inputValue).length
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let validEmail = regex.test(String(inputValue).toLowerCase())

    // Check requirements and return error message
    if (isUndefined || isEmptyString) return 'Bitte geben Sie eine E-Mail-Adresse an'
    if (!validEmail) return 'Bitte geben Sie eine gültige E-Mail-Adresse an'

    return true
  },
  password: (inputValue: any): string | boolean => {

    // Requirements
    let isUndefined = inputValue === undefined || inputValue === null
    let isEmptyString = !String(inputValue).length

    // Check requirements and return error message
    if (isUndefined || isEmptyString) return 'Bitte geben Sie ein Passwort an'
    return true
  }
}

useForm({
  validationSchema: validations
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

// Password length indicator
const passwordLength: Ref<number> = ref(0)

function checkPasswordLength(inputValue: string) {
  return passwordLength.value = inputValue.length
}

const activeSubmitButton = computed((): boolean => {
  return !emailError.value && passwordLength.value > 0
})

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
    password: password.value
  } as AuthRequest
  loginUser(authRequest)
}
</script>

<style lang="scss">
@import '@/assets/scss/views/authorization-form.scss';
</style>

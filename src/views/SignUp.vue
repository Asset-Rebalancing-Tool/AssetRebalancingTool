<template>
  <section id="sign-up">
    <div class="left-wrapper">
      <div class="app-logo"></div>
    </div>
    <div class="right-wrapper">
      <form
        class="sign-in-form"
        @submit.prevent="onSubmit"
        :validation-schema="validations"
      >
        <h1>{{ $t('authorization.headings.signUp') }}</h1>
        <BaseInput
          :class="{ error: emailError }"
          :placeholder="$t('authorization.placeholders.email')"
          type="email"
          v-model="email"
          :error="emailError"
          required
        >
          <template #label>
            <label>{{ $t('authorization.labels.email') }}</label>
          </template>
        </BaseInput>
        <div class="error">{{ emailError }}</div>
        <BaseInput
          :class="{ error: passwordError }"
          :placeholder="$t('authorization.placeholders.password')"
          :type="passwordType"
          @input="checkPasswordStrength($event.target.value)"
          v-model="password"
          :error="passwordError"
          required
        >
          <template #label>
            <label>{{ $t('authorization.labels.password') }}</label>
          </template>
          <template #inputIcon>
            <IconShowPassword
              @click="toggleVisibility"
              v-show="!showPassword"
            />
            <IconHidePassword @click="toggleVisibility" v-show="showPassword" />
          </template>
        </BaseInput>
        <div class="error">{{ passwordError }}</div>
        <div class="form-spacing-wrapper">
          <div class="password-strength-wrapper">
            <span :class="{ strong: passwordStrength >= 1 }"></span>
            <span :class="{ strong: passwordStrength >= 2 }"></span>
            <span :class="{ strong: passwordStrength >= 3 }"></span>
            <span :class="{ strong: passwordStrength >= 4 }"></span>
            <span :class="{ strong: passwordStrength >= 5 }"></span>
          </div>
        </div>
        <button type="submit" :class="{ show: activeSubmitButton }">
          {{ $t('authorization.buttons.signUp') }}
        </button>
        <span class="change-entry-view"
          >{{ $t('authorization.texts.alreadyAMember') }}
          <RouterLink class="link" :to="{ name: 'SignIn' }"
            >{{ $t('authorization.links.signIn') }}</RouterLink
          >
        </span>
        <div class="divider-wrapper">
          <span></span>
          <span>{{ $t('authorization.texts.or') }}</span>
          <span></span>
        </div>
        <button class="third-party-button">
          <IconGoogle />
          <span>{{ $t('authorization.buttons.signUpWithGoogle') }}</span>
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
import { registerUser } from '@/services/TokenService'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


const validations = {
  email: (inputValue: any): string | boolean => {
    // Requirements
    const isUndefined = inputValue === undefined || inputValue === null
    const isEmptyString = !String(inputValue).length
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const validEmail = regex.test(String(inputValue).toLowerCase())

    // Check requirements and return error message
    if (isUndefined || isEmptyString)
      return t('authorization.errorMessages.enterEmail')
    if (!validEmail) return t('authorization.errorMessages.enterValidEmail')

    return true
  },
  password: (inputValue: any): string | boolean => {
    // Requirements
    const isUndefined = inputValue === undefined || inputValue === null
    const isEmptyString = !String(inputValue).length
    const containsUpper = /[A-Z]/.test(inputValue)

    // Check requirements and return error message
    if (isUndefined || isEmptyString) return t('authorization.errorMessages.enterPassword')
    if (!containsUpper)
      return t('authorization.errorMessages.passwordChars')
    if (String(inputValue).length < 8)
      return t('authorization.errorMessages.passwordLength')
    return true
  },
}

useForm({
  validationSchema: validations,
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const activeSubmitButton = computed(() => {
  return passwordStrength.value >= 2
})

const showPassword: Ref<boolean> = ref(false)

// Render the input type in order to show or hide the input value
const passwordType = computed((): string => {
  return showPassword.value ? 'text' : 'password'
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
  const containsUpper = /[A-Z]/.test(passwordInput)
  const length = passwordInput.length
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
    password: password.value,
  }
  registerUser(authRequest)
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/authorization-form.scss';
</style>

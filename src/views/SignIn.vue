<template>
  <section id="sign-in">
    <div class="left-wrapper">
      <div class="app-logo"></div>
      <header>
          <h3 v-html="$t('authorization.headings.subHeading')"></h3>
          <h1 v-html="$t('authorization.headings.mainHeading')"></h1>
          <p v-html="$t('authorization.texts.mainText')"></p>
      </header>
    </div>
    <div class="right-wrapper">
      <form class="sign-in-form" @submit.prevent="onSubmit">
        <h2>{{ $t('authorization.headings.signIn') }}</h2>
        <BaseInput
          :class="{ error: emailError }"
          :placeholder="$t('authorization.placeholders.email') + '@gmail.com'"
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
          @input="checkPasswordLength($event.target.value)"
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
          <BaseCheckbox :label="$t('authorization.labels.stayAuthorized')" />
          <RouterLink class="link" to="">{{ $t('authorization.links.forgotPassword') }}</RouterLink>
        </div>
        <button type="submit" :class="{ show: activeSubmitButton }">
          {{ $t('authorization.buttons.signIn') }}
        </button>
        <span class="change-entry-view"
          >{{ $t('authorization.texts.notAMember') }}
          <RouterLink class="link" :to="{ name: 'SignUp' }"
            >{{ $t('authorization.links.signUp') }}</RouterLink
          >
        </span>
        <div class="divider-wrapper">
          <span></span>
          <span>{{ $t('authorization.texts.or') }}</span>
          <span></span>
        </div>
        <button class="third-party-button">
          <IconGoogle />
          <span>{{ $t('authorization.buttons.signInWithGoogle') }}</span>
        </button>
        <LanguageWrapper />
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
import LanguageWrapper from '@/components/wrappers/LanguageWrapper.vue'
import type { AuthRequest } from '@/requests/AuthRequest'
import { loginUser } from '@/services/TokenService'
import { useField, useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
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

    // Check requirements and return error message
    if (isUndefined || isEmptyString) return t('authorization.errorMessages.enterPassword')
    return true
  },
}

useForm({
  validationSchema: validations,
})

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

// Password length indicator
const passwordLength: Ref<number> = ref(0)

function checkPasswordLength(inputValue: string) {
  return (passwordLength.value = inputValue.length)
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
    password: password.value,
  } as AuthRequest
  loginUser(authRequest)
}
</script>

<style lang="scss">
@import '@/assets/scss/views/authorization-form.scss';
</style>

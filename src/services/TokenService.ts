import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import type { AuthRequest } from '@/requests/AuthRequest'
import router from '@/router'
import { useSearchStore } from '@/stores/SearchStore'
import { useNotificationStore } from '@/stores/NotificationStore'
import type { FlashMessageColorEnum } from '@/models/enums/FlashMessageColorEnum'
import type { FlashMessageIconEnum } from '@/models/enums/FlashMessageIconEnum'
import { i18n } from '@/i18n'
import {useAssetStore} from "@/stores/AssetStore";

/**-******************************************************************-**/
/**---------------------- Authorize Axios Instance --------------------**/
/**-******************************************************************-**/

// The token Datetime
let lastFetched: Date = new Date()

/**
 * Get an authorized axios instance in order to get, post or patch data
 *
 * @return Promise<AxiosInstance>
 */
export function getAuthorizedInstance(): Promise<AxiosInstance> {
  // Check if there is a token deposited
  if (localStorage.getItem('token') === null) {
    return Promise.reject(new Error('should call login first'))
  }

  // Check if the token has expired
  if (lastFetched < new Date(Date.now() - 1000 * 60 * 2)) {
    // fetch a new token if so
    lastFetched = new Date()
    return axios
      .get('/auth_api/renew', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        const instance = axios.create()
        localStorage.setItem('token', response.data)
        instance.defaults.headers.common['Authorization'] =
          'Bearer ' + localStorage.getItem('token')
        return instance
      })
  }

  // Create the axios instance and set the token as header
  const instance = axios.create()
  instance.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('token')

  // Return the authorized instance
  return new Promise<AxiosInstance>((resolve) => resolve(instance))
}

/**-******************************************************************-**/
/**---------------------- Token Based User Actions --------------------**/
/**-******************************************************************-**/

/**
 * Create a new user account, based on the email and password
 *
 * @param request
 *
 * @return Promise<number> Response Status
 */
export function registerUser(request: AuthRequest): Promise<number> {
  const { t } = i18n.global
  return axios
    .post('/auth_api/register', request)
    .then((response: AxiosResponse) => redirectToDashboard(response.data))
    .catch((error) => error.response.status)
}

/**
 * Try to log in a user, based on the email and password
 *
 * @param request AuthRequest
 *
 * @return Promise<number> Response Status
 */
export function loginUser(request: AuthRequest): Promise<number> {
  const { t } = i18n.global
  return axios
    .post<AuthRequest, AxiosResponse<string>>('/auth_api/login', request)
    .then((response: AxiosResponse) => redirectToDashboard(response.data))
    .catch((error) => error.response.status)
}

/**
 * Log out a user by removing the token from the local storage and hiding the sidebar
 *
 * @return void
 */
export const logoutUser = (): void => {
  useAssetStore().resetStoreState()
  useSearchStore().resetStoreState()
  useNotificationStore().resetFlashMessage()
  redirectToLogin()
}

/**-******************************************************************-**/
/**--------------------- Router Redirect Functions --------------------**/
/**-******************************************************************-**/

/**
 * Redirect to the sign-in router view
 *
 * Reset the token datetime, remove the token from localstorage, change the router view and hide the sidebar
 *
 * @return void
 */
function redirectToLogin(): void {
  const searchbarStore = useSearchStore()
  lastFetched = new Date('0000-00-00')
  localStorage.removeItem('token')
  router.push('/sign-in')
  searchbarStore.showSidebar = false
}

/**
 * Redirect to the asset list router view
 *
 * Set the token datetime, add the token to localstorage, change the router view and show the sidebar
 *
 * @return void
 */
function redirectToDashboard(token: string): void {
  const searchbarStore = useSearchStore()
  lastFetched = new Date()
  localStorage.setItem('token', token)
  router.push('/asset-list')
  searchbarStore.showSidebar = true
}

/**
 * Show a flash message on response error status
 *
 * @param icon FlashMessageIconEnum
 * @param color FlashMessageColorEnum
 * @param text string
 */
export function showFlashMessage(
  icon: FlashMessageIconEnum,
  color: FlashMessageColorEnum,
  text: string
) {
  const notificationStore = useNotificationStore()
  // Get the reactive flash message object
  const flashMessage = notificationStore.flashMessage
  flashMessage.icon = icon
  flashMessage.color = color
  flashMessage.text = text
}

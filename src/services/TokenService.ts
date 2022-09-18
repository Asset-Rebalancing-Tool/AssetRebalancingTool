import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { AuthRequest } from '@/requests/AuthRequest'
import type { AxiosInstance } from 'axios'
import router from "@/router";
import { useAssetStore } from '@/stores/AssetStore'

let lastFetched: Date = new Date()

export function getAuthorizedInstance(): Promise<AxiosInstance> {
  if (localStorage.getItem('token') === null) {
    return Promise.reject(new Error('should call login first'))
  }

  if (lastFetched < new Date(Date.now() - 1000 * 60 * 2)) {
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
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        return instance
      })
  }

  const instance = axios.create()

  instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

  return new Promise<AxiosInstance>((resolve) => resolve(instance))
}

export function loginUser(request: AuthRequest): Promise<void> {
  return axios.post<AuthRequest, AxiosResponse<string>>('/auth_api/login', request)
    .then((response) => {
      lastFetched = new Date()
      localStorage.setItem('token', response.data)
      router.push('/asset-list')
      useAssetStore().showSidebar = true
    })
}

export function logout(): void {
    localStorage.removeItem('token');
    useAssetStore().showSidebar = false
}

export function registerUser(request: AuthRequest): Promise<void> {
  return axios.post('/auth_api/register', request)
      .then((response: AxiosResponse) => {
        lastFetched = new Date()
        localStorage.setItem('token', response.data)
        router.push('/asset-list')
      })
}

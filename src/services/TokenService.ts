import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { AuthRequest } from '@/requests/AuthRequest'
import type { AxiosInstance } from 'axios'

let token: string
let lastFetched: Date = new Date()

export function getAuthorizedInstance(): Promise<AxiosInstance> {

  if (!token) {
    return Promise.reject(new Error('should call login first'))
  }

  if (lastFetched < new Date(Date.now() - 1000 * 60 * 2)) {
    lastFetched = new Date()
    return axios
      .get('/auth_api/renew', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((resp) => {
        const instance = axios.create()
        token = resp.data
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
        return instance
      })
  }

  const instance = axios.create()

  instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

  return new Promise<AxiosInstance>((resolve) => resolve(instance))
}

export function login(email: string, password: string): Promise<string> {
  return axios
    .post<AuthRequest, AxiosResponse<string>>('/auth_api/login', {
      email: email,
      password: password,
    } as AuthRequest)
    .then((resp) => {
      token = resp.data
      return resp.data
    })
}

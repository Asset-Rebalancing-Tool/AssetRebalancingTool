import axios from "axios";
import type { AxiosResponse } from "axios";
import type { IAuthRequest } from "@/requests/IAuthRequest"

let token: string
let lastFetched: Date = new Date()

export function getToken(): Promise<string> {

    if (!token) {
        return Promise.reject(new Error('should call login first'))
    }

    if (lastFetched < new Date( Date.now() - 1000 * 60 * 2)) {
        lastFetched = new Date()
        return axios.get('/auth_api/renew',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(resp => {
            token = resp.data;
            return resp.data;
        })
    }

    return new Promise<string>(resolve => resolve(token))
}


export function login(email: string, password: string): Promise<string> {
    return axios.post<IAuthRequest, AxiosResponse<string>>('/auth_api/login', {
        email: email,
        password: password
    } as IAuthRequest).then(resp => {
        token = resp.data;
        return resp.data;
    })
}

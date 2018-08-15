import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { env } from 'decentraland-commons'

const httpClient = axios.create()
const URL = env.get('REACT_APP_API_URL', '')

export interface APIParam {
  [key: string]: any
}
interface Response {
  ok: boolean
  data: any
  error: string
}

export class API {
  fetchDomains() {
    return this.request('get', '/domains', {})
  }

  fetchDomain(id: string) {
    return this.request('get', `/domains/${id}`, {})
  }

  fetchTranslation(locale: string) {
    return this.request('get', `/translations/${locale}`, {})
  }

  request(method: string, path: string, params?: APIParam) {
    let options: AxiosRequestConfig = {
      method,
      url: this.getUrl(path)
    }

    if (params) {
      if (method === 'get') {
        options.params = params
      } else {
        options.data = params
      }
    }

    return httpClient
      .request(options)
      .then((response: AxiosResponse<Response>) => {
        const data = response.data
        const result = data.data // One for axios data, another for the servers data

        return data && !data.ok
          ? Promise.reject({ message: data.error, data: result })
          : result
      })
      .catch((error: AxiosError) => {
        console.warn(`[API] HTTP request failed: ${error.message || ''}`, error)
        return Promise.reject(error)
      })
  }

  getUrl(path: string) {
    return `${URL}/v1${path}`
  }
}

export const api = new API()

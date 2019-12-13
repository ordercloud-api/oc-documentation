import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getBaseUrl } from '../components/Shared/PortalLink'

class DevcenterMiddleware {
  private session: AxiosInstance
  constructor() {
    const baseURL = getBaseUrl()
    this.session = axios.create({})
  }

  public Get(url: string, config?: AxiosRequestConfig) {
    return this.session
      .get(url, config)
      .then(r => r.data)
      .catch(e => {
        throw e.response
      })
  }

  public Post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.session
      .post(url, data, config)
      .then(r => r.data)
      .catch(e => {
        throw e.response
      })
  }
  public Put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.session
      .put(url, data, config)
      .then(r => r.data)
      .catch(e => {
        throw e.response
      })
  }

  public Patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.session
      .patch(url, data, config)
      .then(r => r.data)
      .catch(e => {
        throw e.response
      })
  }

  public Delete(url: string, config?: AxiosRequestConfig) {
    return this.session
      .delete(url, config)
      .then(r => r.data)
      .catch(e => {
        throw e.response
      })
  }
}

export default new DevcenterMiddleware()

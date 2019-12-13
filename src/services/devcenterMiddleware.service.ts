import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getBaseUrl } from '../components/Shared/PortalLink'

class DevcenterMiddleware {
  private session: AxiosInstance
  constructor() {
    // don't be tempted to set baseurl here, it'll work when developing locally
    // but not when it builds (window not available during ssr)
    this.session = axios.create()
  }

  public Get(url: string, config?: AxiosRequestConfig) {
    return this.session
      .get(getBaseUrl() + url, config)
      .then(r => r.data)
      .catch(e => {
        throw e.response
      })
  }

  public Post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.session
      .post(getBaseUrl() + url, data, config)
      .then(r => r.data)
      .catch(e => {
        throw e.response
      })
  }
  public Put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.session
      .put(getBaseUrl() + url, data, config)
      .then(r => r.data)
      .catch(e => {
        throw e.response
      })
  }

  public Patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.session
      .patch(getBaseUrl() + url, data, config)
      .then(r => r.data)
      .catch(e => {
        throw e.response
      })
  }

  public Delete(url: string, config?: AxiosRequestConfig) {
    return this.session
      .delete(getBaseUrl() + url, config)
      .then(r => r.data)
      .catch(e => {
        throw e.response
      })
  }
}

export default new DevcenterMiddleware()

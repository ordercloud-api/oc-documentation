import Axios, { AxiosResponse, AxiosError } from 'axios';
import AxiosTiming from 'axios-timing';
let axios;

const apiUrl: string = 'https://api.ordercloud.io';

const service = {
  GetAllDocs: _getAll
}

function _getAll(): AxiosResponse {
  return _send(`${apiUrl}/v1/docs`);
}

function _send(requestUrl: string): AxiosResponse {
  if (!axios) {
    axios = Axios.create();
    AxiosTiming(axios, (timeInMs: number) => {
      this.duration = Math.round(timeInMs);
    });
  }
  return axios
    .request({
      method: 'GET',
      url: requestUrl
    })
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err: AxiosError) => {
      console.error('Request Error:', err);
      return err;
    })
}

export default service;
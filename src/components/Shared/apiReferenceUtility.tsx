import Axios, { AxiosResponse, AxiosError } from 'axios';
let axios;

const apiUrl: string = 'https://api.ordercloud.io';

const service = {
  GetAllDocs: _getAll
}

async function _getAll(): Promise<AxiosResponse> {
  return await _send(`${apiUrl}/v1/docs`);
}

async function _send(requestUrl: string): Promise<AxiosResponse> {
  if (!axios) {
    axios = Axios.create();
  }
  return axios
    .request({
      method: 'GET',
      url: requestUrl
    })
    .catch((err: AxiosError) => {
      console.error('Request Error:', err);
      return err;
    })
}

export default service;
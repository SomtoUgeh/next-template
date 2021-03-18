import { config } from 'config';
import { get_token } from './auth';
import axios, { AxiosRequestConfig } from 'axios';
import { ApiHeader, OptionsArgs } from 'models/client';

/** Axios interceptors to transform error message for clientFn */
axios.interceptors.response.use(
  response => response,
  error => {
    const err =
      error?.response?.headers?.message ??
      'An error occurred! Please try again';

    return Promise.reject(err);
  }
);

export async function client<ResponseType>(
  endpoint: string,
  { body, headers: customHeaders, ...customConfig }: OptionsArgs = {}
): Promise<ResponseType> {
  const token = get_token();

  const headers: ApiHeader = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const params: AxiosRequestConfig = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customHeaders,
    },
  };

  if (body) params.data = JSON.stringify(body);

  let response: ResponseType;
  const { data } = await axios(`${config.API_ENDPOINT}/${endpoint}`, params);

  if (data?.data) {
    const { data: resolvedResponse } = data;
    response = resolvedResponse;
  } else {
    response = data;
  }

  return response;
}

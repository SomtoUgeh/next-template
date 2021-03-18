import { config } from 'config';
import Cookies from 'js-cookie';
import { client } from 'lib/utils/client';
import { get_token } from '../utils/auth';
import { LoginInterface } from 'models/auth';

async function getUser(): Promise<any> {
  const token = get_token();

  if (!token) return Promise.resolve(null);

  try {
    return await client('user');
  } catch (error) {
    logout();

    return Promise.reject(error);
  }
}

async function login(payload: LoginInterface): Promise<any> {
  const response = await client('login', {
    body: payload,
  });

  return response;
}

function logout(): Promise<void> {
  Cookies.remove(config.TOKEN);
  return Promise.resolve();
}

export { login, logout, getUser };

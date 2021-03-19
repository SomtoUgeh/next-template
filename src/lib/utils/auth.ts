import { config } from 'config';
import Cookies from 'js-cookie';

type CookieKey = string;
type CookieValue = string | undefined | null;

function getValueFromCookie(value: CookieKey): CookieValue {
  let result: CookieValue = null;
  const cookieResponse: CookieValue = Cookies.get(value);

  if (cookieResponse) {
    result = cookieResponse;
    result = JSON.parse(result);

    return result;
  }

  return result;
}

function get_token(): CookieValue {
  return getValueFromCookie(config.TOKEN);
}

export { get_token };

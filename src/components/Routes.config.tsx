import * as React from 'react';
import { config } from 'config';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { get_token } from 'lib/utils/auth';
import { useAuth } from 'contexts/AuthContext';
import { useIdleTimer } from 'react-idle-timer';
import { useUserDetails } from 'lib/queries/auth';
import { FullPageSpinner } from 'components/Loaders';

function checkTokenIsValid(actionFn: () => void) {
  const token = get_token();

  if (token) {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    const decodedToken = decoded as { exp: number };

    if (decodedToken.exp < currentTime) actionFn();
  }
}

export function ProtectedRoutes(
  props: React.PropsWithChildren<Record<string, unknown>>
): React.ReactElement {
  const router = useRouter();
  const { handleLogout } = useAuth();

  const { reset } = useIdleTimer({
    timeout: config.TIME_OUT,
    onIdle: () => {
      // do something here
      handleLogout();
    },
    onActive: () => reset(),
    debounce: 250,
  });

  /**
   * A valid user is a user that has been activated; user.isVerified = true
   * This is used to determine if the user should be shown the authenticated app or not
   */
  const { user, status } = useUserDetails();

  React.useLayoutEffect(() => {
    checkTokenIsValid(handleLogout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (status === 'success' && user === null) router.push('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user]);

  if (status === 'loading') return <FullPageSpinner />;
  if (status === 'success' && user?.isVerified) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return <FullPageSpinner />;
}

export function AuthRoutes(
  props: React.PropsWithChildren<Record<string, unknown>>
): React.ReactElement {
  const router = useRouter();
  const { user, status } = useUserDetails();

  React.useEffect(() => {
    if (status === 'success' && user !== null) router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, status]);

  if (status === 'loading') return <FullPageSpinner />;
  if (status === 'success' && user === null) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return <FullPageSpinner />;
}

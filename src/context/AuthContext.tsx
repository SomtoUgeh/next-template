import { useQuery, useQueryClient } from 'react-query';
import * as authClient from 'lib/api/auth';
import { FullPageSpinner } from 'components/Loaders';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface AuthContextInterface {
  handleLogout: () => Promise<void>;
}

/**
 * BaseFn that tries to authenticate a user on load or refresh
 * If there is no token, the user obj return null and is shown the un-authenticated app
 * else login user and show authenticated app
 */
async function bootstrapAppData() {
  const response = await authClient.getUser();
  if (response !== null) return { user: response };

  return Promise.resolve(null);
}

const AuthContext = createContext({} as AuthContextInterface);

function AuthProvider(props: PropsWithChildren<Record<string, unknown>>) {
  const { Provider } = AuthContext;
  const queryClient = useQueryClient();

  /**
   * A decision to show the loading or error state on app initial load
   */
  const [firstAttemptFinished, setFirstAttemptFinished] = useState(false);

  const { status } = useQuery('user', bootstrapAppData, {
    onSettled: () => setFirstAttemptFinished(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries('userDetails');
    },
  });

  if (!firstAttemptFinished) {
    if (status === 'loading') return <FullPageSpinner />;

    if (status === 'error') {
      return (
        <div style={{ color: 'red' }}>
          <p>Uh oh... There&apos;s a problem. Try refreshing the app.</p>
        </div>
      );
    }
  }

  async function handleLogout() {
    await authClient.logout();
    queryClient.clear();
    window.location.href = '/login';
  }

  return <Provider value={{ handleLogout }} {...props} />;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };

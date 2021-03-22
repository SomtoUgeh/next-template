import * as authClient from '@/lib/api/auth';
import { LoginInterface } from '@/models/auth';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from 'react-query';

function useLogin(): UseMutationResult<any, Error, LoginInterface, unknown> {
  return useMutation(authClient.login);
}

function useUserDetails(): {
  user: any;
  status: 'idle' | 'error' | 'loading' | 'success';
} {
  const queryClient = useQueryClient();

  const { data, status } = useQuery({
    queryKey: 'userDetails',
    queryFn: async () => await queryClient.getQueryData('user'),
  });

  return { user: data, status };
}

export { useLogin, useUserDetails };

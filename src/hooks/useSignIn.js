import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import { useAuthStorage } from './useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });
    console.log(authStorage);
    await authStorage.setAccessToken(data.authenticate.accessToken);
    await apolloClient.resetStore();
    console.log('Reached here.');
    return data;
  };

  return [signIn, result];
};

export default useSignIn;

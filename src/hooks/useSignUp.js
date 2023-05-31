import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [signUp, result] = useMutation(CREATE_USER);

  const createUser = async ({ username, password }) => {
    const { data } = await signUp({
      variables: { user: { username, password } },
    });
    return data;
  };

  return [createUser, result];
};

export default useSignUp;

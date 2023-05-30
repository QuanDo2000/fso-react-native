import { useNavigate } from 'react-router-native';
import useSignIn from '../../hooks/useSignIn';

import SignInContainer from './SignInContainer';

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;

    signIn({ username, password })
      .then((result) => {
        console.log(result.authenticate);
        if (result.authenticate) {
          navigate('/');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;

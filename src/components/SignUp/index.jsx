import { useNavigate } from 'react-router-native';
import useSignIn from '../../hooks/useSignIn';
import useSignUp from '../../hooks/useSignUp';
import SignUpContainer from './SignUpContainer';

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = (values) => {
    const { username, password } = values;

    createUser({ username, password })
      .then((result) => {
        if (result) {
          signIn({ username, password });
          navigate('/');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;

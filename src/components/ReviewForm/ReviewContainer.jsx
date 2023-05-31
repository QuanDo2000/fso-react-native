import * as yup from 'yup';
import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';

import theme from '../../theme';

import Text from '../Text';
import FormikTextInput from '../FormikTextInput';

const styles = StyleSheet.create({
  formStyle: {
    backgroundColor: 'white',
    padding: 15,
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.appBarText,
  },
});

const initialValues = {
  owner: '',
  repository: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  owner: yup.string().required('Repository owner name is required'),
  repository: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  review: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.formStyle}>
      <FormikTextInput name="owner" placeholder="Repository owner name" />
      <FormikTextInput name="repository" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="review" placeholder="Review" multiline />
      <Pressable onPress={onSubmit} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ReviewContainer;

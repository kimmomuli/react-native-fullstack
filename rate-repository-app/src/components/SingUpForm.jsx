import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import theme from '../styles';
import FormikTextInput from './FromikTextInput';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/queries';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: 'bold',
  },
});

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(1, 'Username must be between 1 and 30 characters')
    .max(30, 'Username must be between 1 and 30 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be between 5 and 50 characters')
    .max(50, 'Password must be between 5 and 50 characters'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput name="passwordConfirmation" placeholder="Confirm password" secureTextEntry />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '', passwordConfirmation: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignUp;
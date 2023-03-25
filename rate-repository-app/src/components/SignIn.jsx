import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import * as yup from 'yup';
import FormikTextInput from './FromikTextInput';
import theme from '../styles';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});


const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
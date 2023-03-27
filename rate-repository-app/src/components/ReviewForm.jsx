import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import theme from '../styles';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/queries';
import FormikTextInput from './FromikTextInput';

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
  },
  buttonText: {
    color: "white",
    fontWeight: 'bold',
  },
});

const validationSchema = Yup.object().shape({
  ownerUsername: Yup.string()
    .required('Repository owner username is required'),
  repositoryName: Yup.string()
    .required('Repository name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  review: Yup.string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="ownerUsername" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="review" placeholder="Review" />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const handleReviewSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerUsername,
            repositoryName: values.repositoryName,
            rating: parseInt(values.rating),
            text: values.review,
          },
        },
      });

      if (data && data.createReview) {
        navigate(`/repositories/${data.createReview.repositoryId}`);
      }
    } catch (error) {
      console.log('Error submitting review:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          ownerUsername: '',
          repositoryName: '',
          rating: '',
          review: '',
        }}
        onSubmit={handleReviewSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default ReviewForm;
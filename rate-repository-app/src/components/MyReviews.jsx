import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Pressable } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { ME, DELETE_REVIEW } from '../graphql/queries';
import { format } from 'date-fns'
import { useNavigate } from 'react-router-native';
import theme from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  reviewItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#000',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewInfo: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  createdAt: {
    color: '#999',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    padding: 16,
    paddingHorizontal: 26,
    borderRadius: 4,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});


const ReviewItem = ({ review, viewRepository, confirmDeleteReview }) => {
  const { repository, rating, text, createdAt } = review;
  const formattedDate = format(new Date(createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.reviewItem}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{rating}</Text>
      </View>
      <View style={styles.reviewInfo}>
        <Text style={styles.username}>{repository.fullName}</Text>
        <Text style={styles.createdAt}>{formattedDate}</Text>
        <Text>{text}</Text>
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => viewRepository(repository.id)}
            style={[styles.button, styles.viewButton]}
          >
            <Text style={styles.buttonText}>View Repository</Text>
          </Pressable>
          <Pressable
            onPress={() => confirmDeleteReview(review.id)}
            style={[styles.button, styles.deleteButton]}
          >
            <Text style={styles.buttonText}>Delete Review</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDeleteReview = async (id) => {
    const result = await deleteReview({ variables: { id } });
    if (result.data.deleteReview) {
      Alert.alert('Review deleted successfully');
      refetch();
    } else {
      Alert.alert('Error deleting review');
    }
  };

  const confirmDeleteReview = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteReview(id),
          style: 'destructive',
        },
      ],
      { cancelable: false },
    );
  };

  const viewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  const reviews = data?.me?.reviews?.edges?.map(edge => edge.node) || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
            viewRepository={viewRepository}
            confirmDeleteReview={confirmDeleteReview}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MyReviews;
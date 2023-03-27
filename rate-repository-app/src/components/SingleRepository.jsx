import React from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import Text from './Text';
import { View, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns'

const styles = StyleSheet.create({
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
});

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} showGitHubButton />;
};

const ReviewItem = ({ review }) => {
  const { user, rating, text, createdAt } = review;
  const formattedDate = format(new Date(createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.reviewItem}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{rating}</Text>
      </View>
      <View style={styles.reviewInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.createdAt}>{formattedDate}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default SingleRepository;
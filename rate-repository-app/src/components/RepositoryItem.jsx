import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../styles';

const formatCount = (count) => {
  return count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  detailsContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    color: '#ffffff',
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statsItem: {
    alignItems: 'center',
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.detailsContainer}>
          <Text style={styles.bold}>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.languageTag}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.bold}>{formatCount(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.bold}>{formatCount(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.bold}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.bold}>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
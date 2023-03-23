import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  tab: {
    color: '#ffffff',
    fontSize: 18,
    textDecorationLine: 'none',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: 'bold',
  },
});

const AppBarTab = ({ title, route }) => {
  return (
    <Link to={route} component={Pressable}>
      <Text style={styles.tab}>{title}</Text>
    </Link>
  );
};

export default AppBarTab;
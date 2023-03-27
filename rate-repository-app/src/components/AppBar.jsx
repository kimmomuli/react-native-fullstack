import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../styles';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const signOut = useSignOut();

  const isAuthenticated = data && data.me;
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab title="Repositories" route="/" />
        {isAuthenticated ? (
          <>
            <AppBarTab title="Create a review" route="/createreview" />
            <AppBarTab title="My reviews" route="/myreviews" />
            <AppBarTab title="Sign out" onPress={signOut} />
          </>
        ) : (
          <>
            <AppBarTab title="Sign in" route="/signin" />
            <AppBarTab title="Sign up" route="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
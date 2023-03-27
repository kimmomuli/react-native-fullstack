import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import { Route, Routes, Navigate } from 'react-router-native';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import SignUp from './SingUpForm';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact/>
        <Route path="/signin" element={<SignIn replace />} />
        <Route path="/repository/:id" element={<SingleRepository replace/>} />
        <Route path="/createreview" element={<ReviewForm replace/>} />
        <Route path="/signup" element={<SignUp replace/>} />
        <Route path="/myreviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;

import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import theme from '../styles';

const styles = StyleSheet.create({
  font: {
    fontFamily: theme.fonts.main,
  },
});

const Text = ({ style, children }) => {
  return <RNText style={[styles.font, style]}>{children}</RNText>;
};

export default Text;
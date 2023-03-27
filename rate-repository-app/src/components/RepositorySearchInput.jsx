import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 10,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    marginLeft: 10,
  },
  clearIcon: {
    marginRight: 10,
  },
});

const RepositorySearchInput = ({ searchKeyword, setSearchKeyword }) => {
  return (
    <View style={styles.searchContainer}>
      <Icon name="search" size={20} style={styles.searchIcon} />
      <TextInput
        value={searchKeyword}
        onChangeText={(text) => setSearchKeyword(text)}
        placeholder="Search repositories..."
        style={styles.searchInput}
      />
      {searchKeyword !== '' && (
        <Icon
          name="close"
          size={20}
          style={styles.clearIcon}
          onPress={() => setSearchKeyword('')}
        />
      )}
    </View>
  );
};

export default RepositorySearchInput;
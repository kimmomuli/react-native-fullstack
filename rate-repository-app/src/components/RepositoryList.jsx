import React, { useState }  from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import SortingPicker from './SortingPicker';
import { useDebounce } from 'use-debounce';
import RepositorySearchInput from './RepositorySearchInput';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, sorting, setSorting, searchKeyword, setSearchKeyword }) => {
  const navigate = useNavigate();

  const handlePress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <>
          <RepositorySearchInput searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
          <SortingPicker sorting={sorting} setSorting={setSorting} />
        </>
      }
    />
  );
};

const RepositoryList = () => {
  const [sorting, setSorting] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const orderBy = sorting === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE';
  const orderDirection = sorting === 'lowest' ? 'ASC' : 'DESC';
  const { repositories } = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);

  return (
    <RepositoryListContainer
      repositories={repositories}
      sorting={sorting}
      setSorting={setSorting}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
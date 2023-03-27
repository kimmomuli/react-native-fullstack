import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const [repositories, setRepositories] = useState([]);
  const variables = { first: 8, orderBy, orderDirection, searchKeyword };
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const fetchRepositories = async () => {
    if (data) {
      setRepositories(data.repositories.edges.map(edge => edge.node));
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [data]);

  return { repositories, loading, refetch };
};

export default useRepositories;
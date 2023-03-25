import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
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
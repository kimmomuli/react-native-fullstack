import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryList';

const formatCount = (count) => {
  return count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count;
};

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories.edges.map(edge => edge.node)} />);

      const repositoryItems = await waitFor(() =>
        screen.getAllByTestId('repositoryItem')
      );
      expect(repositoryItems).toHaveLength(repositories.edges.length);

      repositories.edges.forEach((edge, index) => {
        const repositoryItem = repositoryItems[index];
        const { node } = edge;

        expect(repositoryItem).toHaveTextContent(node.fullName);
        expect(repositoryItem).toHaveTextContent(node.description);
        expect(repositoryItem).toHaveTextContent(node.language);
        expect(repositoryItem).toHaveTextContent(formatCount(node.forksCount));
        expect(repositoryItem).toHaveTextContent(formatCount(node.stargazersCount));
        expect(repositoryItem).toHaveTextContent(node.ratingAverage);
        expect(repositoryItem).toHaveTextContent(node.reviewCount);
      });
    });
  });
});
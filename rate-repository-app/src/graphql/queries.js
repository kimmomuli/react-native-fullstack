import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($first: Int, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(first: $first, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      user {
        id
        username
      }
      repository {
        id
        fullName
      }
      rating
      createdAt
      text
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
mutation CreateUser($user: CreateUserInput!) {
  createUser(user: $user) {
    id
    username
  }
}
`;

export const ME = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            repository {
              id
              fullName
            }
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
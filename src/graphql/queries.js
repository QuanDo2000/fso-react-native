import { gql } from '@apollo/client';
import { REPOSITORY_INFO, REVIEW_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_INFO}
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryInfo
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${REPOSITORY_INFO}
  ${REVIEW_INFO}
  query ($id: ID!) {
    repository(id: $id) {
      ...RepositoryInfo
      url
      reviews {
        edges {
          node {
            ...ReviewInfo
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

export const ME = gql`
  ${REVIEW_INFO}
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewInfo
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`;

import { gql } from '@apollo/client';
import { PAGE_INFO, REPOSITORY_INFO, REVIEW_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_INFO}
  ${PAGE_INFO}
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        node {
          ...RepositoryInfo
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${REPOSITORY_INFO}
  ${REVIEW_INFO}
  ${PAGE_INFO}
  query ($id: ID!, $after: String, $first: Int) {
    repository(id: $id) {
      ...RepositoryInfo
      url
      reviews(after: $after, first: $first) {
        edges {
          node {
            ...ReviewInfo
            user {
              id
              username
            }
          }
        }
        pageInfo {
          ...PageInfo
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
              url
            }
          }
        }
      }
    }
  }
`;

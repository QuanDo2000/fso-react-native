import { gql } from '@apollo/client';

export const REPOSITORY_INFO = gql`
  fragment RepositoryInfo on Repository {
    id
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    ownerAvatarUrl
    description
    language
  }
`;

export const REVIEW_INFO = gql`
  fragment ReviewInfo on Review {
    id
    userId
    repositoryId
    rating
    createdAt
    text
  }
`;

export const PAGE_INFO = gql`
  fragment PageInfo on PageInfo {
    endCursor
    hasNextPage
    startCursor
  }
`;

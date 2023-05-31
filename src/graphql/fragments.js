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

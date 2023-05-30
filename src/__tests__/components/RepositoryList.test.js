import { render, screen } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
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

      // Add your test code here
      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      expect(repositoryItems).toHaveLength(2);

      const [firstRepository, secondRepository] = repositories.edges;

      expect(firstRepository.node.fullName).toBe(
        repositories.edges[0].node.fullName
      );
      expect(secondRepository.node.fullName).toBe(
        repositories.edges[1].node.fullName
      );
      expect(firstRepository.node.description).toBe(
        repositories.edges[0].node.description
      );
      expect(secondRepository.node.description).toBe(
        repositories.edges[1].node.description
      );
      expect(firstRepository.node.language).toBe(
        repositories.edges[0].node.language
      );
      expect(secondRepository.node.language).toBe(
        repositories.edges[1].node.language
      );
      expect(firstRepository.node.forksCount).toBe(
        repositories.edges[0].node.forksCount
      );
      expect(secondRepository.node.forksCount).toBe(
        repositories.edges[1].node.forksCount
      );
      expect(firstRepository.node.stargazersCount).toBe(
        repositories.edges[0].node.stargazersCount
      );
      expect(secondRepository.node.stargazersCount).toBe(
        repositories.edges[1].node.stargazersCount
      );
      expect(firstRepository.node.ratingAverage).toBe(
        repositories.edges[0].node.ratingAverage
      );
      expect(secondRepository.node.ratingAverage).toBe(
        repositories.edges[1].node.ratingAverage
      );
      expect(firstRepository.node.reviewCount).toBe(
        repositories.edges[0].node.reviewCount
      );
      expect(secondRepository.node.reviewCount).toBe(
        repositories.edges[1].node.reviewCount
      );
    });
  });
});

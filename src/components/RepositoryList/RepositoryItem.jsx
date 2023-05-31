import { useParams } from 'react-router-native';
import useRepository from '../../hooks/useRepository';

import { FlatList, StyleSheet, View } from 'react-native';
import RepositoryInfo from './RepositoryInfo';
import Text from '../Text';

import theme from '../../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.repositoryItemBackground,
    display: 'flex',
    flexDirection: 'row',
  },
  flexItemA: {
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 20,
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    color: theme.colors.primary,
  },
  flexItemB: {
    paddingLeft: 15,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexItemA}>
        <Text fontWeight="bold" style={styles.rating}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.flexItemB}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const RepositoryItem = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  if (loading) {
    return null;
  }

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={repository} single />
      )}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryItem;

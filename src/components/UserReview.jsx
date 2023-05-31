import { FlatList, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { format } from 'date-fns';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

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
        <Text fontWeight="bold">{review.repository.fullName}</Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const UserReview = () => {
  const { data } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (!data) return null;
  if (!data.me) return null;
  if (!data.me.reviews) return null;
  if (!data.me.reviews.edges) return null;

  const reviews = data.me.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReview;

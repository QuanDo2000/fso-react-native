import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { format } from 'date-fns';

import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

import theme from '../theme';

import Text from './Text';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.repositoryItemBackground,
    display: 'flex',
    flexDirection: 'column',
  },
  flexContainerA: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  flexContainerB: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  leftButtonStyle: {
    margin: 5,
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexGrow: 1,
  },
  rightButtonStyle: {
    margin: 5,
    backgroundColor: theme.colors.error,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexGrow: 1,
  },
  buttonText: {
    color: theme.colors.appBarText,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleViewRepository = () => {
    navigate(`/repositories/${review.repository.id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteReview({ variables: { id: review.id } })
              .then(() => {
                console.log('Review deleted');
                refetch();
              })
              .catch((error) => {
                console.log(error);
              });
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainerA}>
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
      <View style={styles.flexContainerB}>
        <Pressable
          onPress={handleViewRepository}
          style={styles.leftButtonStyle}
        >
          <Text fontWeight="bold" style={styles.buttonText}>
            View repository
          </Text>
        </Pressable>
        <Pressable onPress={handleDelete} style={styles.rightButtonStyle}>
          <Text fontWeight="bold" style={styles.buttonText}>
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const UserReview = () => {
  const { data, refetch } = useQuery(ME, {
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
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReview;

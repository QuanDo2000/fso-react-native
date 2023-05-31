import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import Constants from 'expo-constants';

import { ME } from '../graphql/queries';

import theme from '../theme';
import Text from './Text';
import { useAuthStorage } from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
  },
  tabContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  tabText: {
    color: theme.colors.appBarText,
  },
});

const AppBarTab = ({ link, text }) => {
  return (
    <Pressable style={styles.tabContainer}>
      <Link to={link}>
        <Text fontSize="subheading" fontWeight="bold" style={styles.tabText}>
          {text}
        </Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  const handleSignOut = async () => {
    console.log('sign out');
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  const isSignedIn = !loading && data && data.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link="/" text="Repositories" />
        {isSignedIn ? (
          <>
            <AppBarTab link="/new_review" text="Create a review" />
            <Pressable style={styles.tabContainer} onPress={handleSignOut}>
              <Text
                fontSize="subheading"
                fontWeight="bold"
                style={styles.tabText}
              >
                Sign out
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <AppBarTab link="/signin" text="Sign in" />
            <AppBarTab link="/signup" text="Sign up" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

import Constants from 'expo-constants';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Text from './Text';

import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
  },
  tabContainer: {
    padding: 20,
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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link="/" text="Repositories" />
        <AppBarTab link="/signin" text="Sign in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;

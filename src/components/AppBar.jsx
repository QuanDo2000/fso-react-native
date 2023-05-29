import Constants from 'expo-constants';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  tabContainer: {
    padding: 20,
  },
  tabText: {
    color: theme.colors.appBarText,
  },
});

const AppBarTab = () => {
  return (
    <Pressable
      style={styles.tabContainer}
      onPress={() => console.log('pressed')}
    >
      <Text fontSize="subheading" fontWeight="bold" style={styles.tabText}>
        Repositories
      </Text>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab />
    </View>
  );
};

export default AppBar;

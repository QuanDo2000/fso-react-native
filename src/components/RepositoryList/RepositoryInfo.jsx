import * as Linking from 'expo-linking';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.repositoryItemBackground,
    display: 'flex',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.repositoryLanguageText,
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-start',
  },
  flexItemA: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  flexItemAA: {
    padding: 10,
  },
  flexItemAB: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
  },
  flexText: {
    paddingBottom: 5,
    flexWrap: 'wrap',
  },
  flexItemB: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flexStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonStyle: {
    margin: 5,
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.appBarText,
  },
});

const RepositoryStat = ({ stat, label }) => {
  if (stat > 1000) {
    stat = (stat / 1000).toFixed(1) + 'k';
  }
  return (
    <View style={styles.flexStat}>
      <Text fontSize="subheading" fontWeight="bold">
        {stat}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryInfo = ({ repository, single }) => {
  const handlePress = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.flexItemA}>
        <View style={styles.flexItemAA}>
          <Image
            style={styles.avatar}
            source={{ uri: repository.ownerAvatarUrl }}
          />
        </View>
        <View style={styles.flexItemAB}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.flexText}>
            {repository.fullName}
          </Text>
          <Text color="textSecondary" style={styles.flexText}>
            {repository.description}
          </Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.flexItemB}>
        <RepositoryStat stat={repository.stargazersCount} label="Stars" />
        <RepositoryStat stat={repository.forksCount} label="Forks" />
        <RepositoryStat stat={repository.reviewCount} label="Reviews" />
        <RepositoryStat stat={repository.ratingAverage} label="Rating" />
      </View>
      {single && (
        <Pressable onPress={handlePress} style={styles.buttonStyle}>
          <Text fontWeight="bold" style={styles.buttonText}>
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryInfo;

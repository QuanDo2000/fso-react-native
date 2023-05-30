import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';

import { FlatList, View, StyleSheet, Pressable } from 'react-native';

import RepositoryInfo from './RepositoryInfo';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges
      ? repositories.edges.map((edge) => edge.node)
      : []
    : [];

  const handlePress = (item) => {
    return () => {
      navigate(`/repositories/${item.id}`);
    };
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={handlePress(item)}>
          <RepositoryInfo repository={item} />
        </Pressable>
      )}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;

import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';

import { FlatList, View, StyleSheet, Pressable } from 'react-native';

import RepositoryInfo from './RepositoryInfo';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  filter: {
    marginLeft: 10,
  },
  filterItem: {
    marginLeft: 10,
  },
});

const RepositoryFilter = ({ refetch }) => {
  const [selectedValue, setSelectedValue] = useState('latest');

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    switch (itemValue) {
      case 'latest':
        refetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
        break;
      case 'highest':
        refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
        break;
      case 'lowest':
        refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.filter}>
      <Picker selectedValue={selectedValue} onValueChange={handleValueChange}>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, refetch }) => {
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
      ListHeaderComponent={<RepositoryFilter refetch={refetch} />}
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
  const { repositories, refetch } = useRepositories({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });
  return (
    <RepositoryListContainer repositories={repositories} refetch={refetch} />
  );
};

export default RepositoryList;

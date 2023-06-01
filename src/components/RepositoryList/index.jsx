import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';

import theme from '../../theme';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryInfo from './RepositoryInfo';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

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
  searchBar: {
    marginRight: 10,
    marginTop: 10,
    backgroundColor: theme.colors.repositoryItemBackground,
  },
});

const RepositoryFilter = ({ refetch }) => {
  const [selectedValue, setSelectedValue] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');

  useEffect(() => {
    refetch({
      orderBy,
      orderDirection,
      searchKeyword: debouncedQuery,
    });
  }, [orderBy, orderDirection, debouncedQuery]);

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    switch (itemValue) {
      case 'latest':
        setOrderBy('CREATED_AT');
        setOrderDirection('DESC');
        break;
      case 'highest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('DESC');
        break;
      case 'lowest':
        setOrderBy('RATING_AVERAGE');
        setOrderDirection('ASC');
        break;
      default:
        break;
    }
  };

  const handleQueryChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.filter}>
      <Searchbar
        style={styles.searchBar}
        mode="bar"
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleQueryChange}
      />
      <Picker selectedValue={selectedValue} onValueChange={handleValueChange}>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  refetch,
  onEndReach,
}) => {
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
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, refetch, fetchMore } = useRepositories({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
    searchKeyword: '',
    first: 10,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      refetch={refetch}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;

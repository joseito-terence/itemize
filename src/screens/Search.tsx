/* eslint-disable react-native/no-inline-styles */
import { FlatList, View } from 'react-native';
import React from 'react';
import { Text, useTheme, Searchbar } from 'react-native-paper';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import { categories } from '../../constants';
import ItemCard from '../components/ItemCard';
import { useAppSelector } from '../redux/hooks';

export default function Search() {
  const theme = useTheme();
  const items = useAppSelector(state => state.items);
  const [searchQuery, setSearchQuery] = React.useState('');

  const CategoryWiseTabs = React.useMemo(() => {
    return categories.map((category, idx) => {
      const _items = items.filter(
        item => category === 'All' || item.category === category,
      );

      if (_items.length === 0) {
        return null;
      }
      return (
        <TabScreen label={category} key={idx}>
          <FlatList
            data={_items.filter(item =>
              JSON.stringify(item)
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
            )}
            renderItem={({ index, item }) => (
              <ItemCard
                item={item}
                sharedTransitionTag={`Search_${category}_${index.toString()}`}
              />
            )}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={{ padding: 16, gap: 14 }}
          />
        </TabScreen>
      );
    });
  }, [items, searchQuery]);

  return (
    <View className="flex-1">
      <View
        className="p-4 rounded-b-2xl"
        style={{ backgroundColor: theme.colors.secondaryContainer }}>
        <Text variant="displaySmall" className="font-bold mt-4 mb-6">
          Search
        </Text>

        <View className="mb-4">
          <Searchbar
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ backgroundColor: theme.colors.onSecondary }}
          />
        </View>
      </View>

      <TabsProvider
        defaultIndex={0}
        // onChangeIndex={handleChangeIndex} optional
      >
        <Tabs mode="scrollable" showLeadingSpace={false}>
          {CategoryWiseTabs}
        </Tabs>
      </TabsProvider>
    </View>
  );
}

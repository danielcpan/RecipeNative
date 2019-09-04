import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RecipesScreen from '../screens/RecipesScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const RecipesStack = createStackNavigator(
  {
    Recipes: RecipesScreen,
  },
  config
);

RecipesStack.navigationOptions = {
  tabBarLabel: 'Recipes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? `ios-book` : 'md-book'
      }
    />
  ),
};

RecipesStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
};

SearchStack.path = '';

const FavoritesStack = createStackNavigator(
  {
    Favorites: FavoritesScreen,
  },
  config
);

FavoritesStack.navigationOptions = {
  tabBarLabel: 'Favorites',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-heart' : 'md-favorites'} />
  ),
};

FavoritesStack.path = '';

const tabNavigator = createBottomTabNavigator({
  RecipesStack,
  SearchStack,
  FavoritesStack,
});

tabNavigator.path = '';

export default tabNavigator;

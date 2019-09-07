import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RecipesScreen from '../screens/RecipesScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const RecipesDetailsStack = createStackNavigator(
  {
    RecipesDetails: RecipeDetailScreen,
  },
  config
);

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
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  ),
};

RecipesStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    // Search: RecipeDetailScreen
    RecipesDetails: RecipeDetailScreen,
  },
  config
);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
      focused={focused} 
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} 
    />
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
    <TabBarIcon 
      focused={focused} 
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'} 
    />
  ),
};

FavoritesStack.path = '';

const tabNavigator = createBottomTabNavigator({
  SearchStack,
  RecipesStack,
  // SearchStack,
  FavoritesStack,
  // RecipesDetailsStack
});

tabNavigator.path = '';

export default tabNavigator;

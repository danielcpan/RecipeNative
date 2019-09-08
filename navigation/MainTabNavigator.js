import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RecipesScreen from '../screens/RecipesScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
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
  title: 'Recipes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  ),
};

RecipesStack.path = '';

const DiscoverStack = createStackNavigator(
  {
    Discover: DiscoverScreen,
    // Discover: RecipeDetailScreen
    RecipesDetails: RecipeDetailScreen,
  },
  config
);

DiscoverStack.navigationOptions = {
  title: 'Discover',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
      focused={focused} 
      name={Platform.OS === 'ios' ? 'ios-compass' : 'md-compass'} 
    />
  ),
};

DiscoverStack.path = '';

const FavoritesStack = createStackNavigator(
  {
    Favorites: FavoritesScreen,
  },
  config
);

FavoritesStack.navigationOptions = {
  title: 'Favorites',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
      focused={focused} 
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'} 
    />
  ),
};

FavoritesStack.path = '';

const tabNavigator = createBottomTabNavigator({
  DiscoverStack,
  RecipesStack,
  // DiscoverStack,
  FavoritesStack,
}, {
  tabBarOptions: { 
    showLabel: false,
    initialRouteName: 'DiscoverStack'
  }
});

tabNavigator.path = '';

export default tabNavigator;

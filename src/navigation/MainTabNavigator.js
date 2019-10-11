import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import RecipeListScreen from '../screens/RecipeListScreen';

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

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  title: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

HomeStack.path = '';

const DiscoverStack = createStackNavigator(
  {
    Discover: DiscoverScreen,
    RecipesDetails: RecipeDetailScreen,
    Search: SearchScreen,
    RecipeList: RecipeListScreen
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
  // HomeStack,
  // DiscoverStack,
  // HomeStack,
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

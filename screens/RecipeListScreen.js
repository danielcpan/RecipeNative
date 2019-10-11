import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import theme from '../constants/theme';
import StarRating from 'react-native-star-rating';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import { 
  Text,
} from 'native-base';
import RecipeList from '../components/RecipeList';

import * as RecipeTypes from '../constants/recipeTypes';
import * as RecipeActions from '../actions/recipeActions';
import { getRecipes } from '../reducers/recipeReducer';

const RecipeListScreen = props => {
  const { 
    recipes,
    isLoading,
    loadRecipes,
    navigation: {
      state: {
        params: {
          category,
        }
      }
    }
  } = props;

  const [params, setParams] = useState({
    skip: 5,
    limit: 5,
  })

  const handleEnd = () => {
    console.log('handling end!')
    setParams({ ...params, skip: params.skip += 10})
  }

  // console.log('props')
  // console.log(props)
  
  useEffect(() => {
    // Need to fix how more loads
    console.log('loading more?')
    loadRecipes(category, params);
  }, [params])

  return (
    <ScrollView>
      <View>
        <RecipeList 
          data={recipes}
          isLoading={isLoading}
          navigation={props.navigation}
          autoLoadMore={true}
          handleEnd={handleEnd}
        />
      </View>
    </ScrollView>
  );
}

RecipeListScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: <Text>{`${navigation.getParam('category')} Recipes`}</Text>,
  headerStyle: {
    borderBottomWidth: 0,
  },
});

const mapStateToProps = (state, { navigation }) => ({
  isLoading: state.recipes[`${navigation.getParam('category')}IsLoading`],
  recipes: getRecipes(state, navigation.getParam('category')),
});

const mapDispatchToProps = dispatch => ({
  loadRecipes: (category, params, options) => dispatch(RecipeActions.loadRecipes(category, params, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListScreen);
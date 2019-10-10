import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import theme from '../constants/theme'
import StarRating from 'react-native-star-rating';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import { 
  Text,
  Icon,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Button,
  Left,
  Input,
  Item,
} from 'native-base';

import SearchHeader from '../components/SearchHeader';
import RecipeSearchList from '../components/RecipeSearchList';

import * as RecipeActions from '../actions/recipeActions';
import * as GeneralUtils from '../utils/general.utils';
import { getSearchedRecipes } from '../reducers/recipeReducer';
import { Platform } from '@unimodules/core';

const SearchScreen = props => {
  const { recipes, isLoading, hasErrored, error, navigation } = props;
  // console.log('search screen')
  // console.log(props)
  
  return (
    <ScrollView>
      {/* <View style={{backgroundColor: 'black'}}>
        <ImageBackground source={{uri: 'https://images.summitmedia-digital.com/yummyph/images/2016/08/01/IG-main.jpg'}} style={styles.hero}>
          <View>
            <Text style={{color: 'white'}}>Hello</Text>
          </View>
        </ImageBackground>
      </View> */}
      
      {/* <View style={styles.container}>
        <Text style={styles.headerTitle}>Search</Text>
      </View> */}

      <View>
        <View style={styles.container}>
          <View style={styles.listHeader}>
            <Text style={styles.subHeaderTitle}>Recipes</Text>
            {/* <Text style={styles.seeMoreText}>SEE MORE</Text> */}
          </View>
        </View>
        <RecipeSearchList 
          data={recipes}
          isLoading={isLoading}
          navigation={navigation}
          autoLoadMore={false}
        />
      </View>
    
    </ScrollView>
  );
}

SearchScreen.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerLeft: <SearchHeader navigation={navigation} />
});

const styles = StyleSheet.create({
  hero: {
      height: 0.25 * Dimensions.get("window").height,
      // opacity: 0.5,
    width: null,
  },
  header: {
    ...theme.padding(5, 15, 5, 15),
  },
  headerTitle: {
    fontSize: theme.fontSizeLg,
    fontWeight: theme.fontWeightHeavy,
    color: theme.primaryColor
  },
  subHeaderTitle: {
    fontSize: theme.fontSizeSm,
    fontWeight: theme.fontWeightHeavy,    
  },
  cardList: {
    ...theme.padding(0, 0, 0, 15),
  },
  container: {
    ...theme.padding(7.5, 15, 7.5, 15),
  },
  view: {
    ...theme.margin(7.5, 10),
    backgroundColor: theme.primaryBackgroundColor,
    width: 165,
    height: 124,
    borderRadius: theme.borderRadiusMedium,
  },
  view2: {
    ...theme.margin(7.5, 10),
    backgroundColor: theme.secondaryBackgroundColor,
    width: 165,
    height: 124,
    borderRadius: theme.borderRadiusMedium,
  },
  card: {
    marginLeft: -theme.spacingLg,
  },
  cardImageContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 7.5
  },
  cardImage: {
    borderRadius: 10, 
    height: 300,
    width: 225
  },
  cardTitle: {
    fontSize: theme.fontSizeXs,
    width: 165
  },
  starRating: {
    flexDirection: 'row'
  },
  listHeader: {
    display: 'flex', 
    justifyContent: 'space-between', 
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  popularCollectionsContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    width: 1225, 
    ...theme.margin(7.5, 7.5)
  },
  popularCollectionButton: {
    backgroundColor: theme.primaryColor, 
    borderRadius: 20, 
    height: 35,
    ...theme.margin(3)    
  },
  popularCollectionButtonText: {
    fontSize: theme.fontSizeXs, 
    fontWeight: theme.fontWeightHeavy    
  },
  seeMoreText: {
    fontSize: theme.fontSizeXs, 
    fontWeight: theme.fontWeightMedium    
  }
});

const mapStateToProps = state => ({
  isLoading: state.recipes.isLoading,
  hasErrored: state.recipes.hasErrored,
  error: state.recipes.error,
  recipes: getSearchedRecipes(state)
});

// const mapDispatchToProps = dispatch => ({
//   fetchSearchRecipes: query => dispatch(RecipeActions.fetchSearchRecipes(query))
// });

export default connect(mapStateToProps)(SearchScreen);
// export default SearchScreen;

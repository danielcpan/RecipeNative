import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import theme from '../constants/theme';
import StarRating from 'react-native-star-rating';
import { ScrollView, View, StyleSheet, Platform, Picker } from 'react-native';
import { 
  Text,
  Icon,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Button,
} from 'native-base';
import SearchInput from '../components/SearchInput';
import RecipeList from '../components/RecipeList';

import * as RecipeTypes from '../constants/recipeTypes';
import * as RecipeActions from '../actions/recipeActions';
import { getRecipes } from '../reducers/recipeReducer';

const popularCollections = [
  'Beef', 'Fish', 'Lamb', 'Pork', 'Poultry', 'Shellfish', 'Vegetarian', 'African', 'American', 
  'Asian', 'British', 'Cajun Creole', 'Caribbean', 'Chinese', 'Eastern European', 'Egyptian', 
  'French', 'German', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Latin American', 
  'Mediterranean', 'Mexican', 'Middle Eastern', 'Moroccan', 'Nepalese', 'Southern', 'Spanish', 
  'Swedish', 'Thai', 'Vietnamese'
]

const DiscoverScreen = props => {
  const { 
    mostLikedRecipes, 
    popularRecipes, 
    newRecipes, 
    mostLikedIsLoading, 
    popularIsLoading, 
    newIsLoading, 
    loadRecipes,
    navigation 
  } = props;

  const [mostLikedParams, setMostLikedParams] = useState({
    skip: 0,
    // limit: 5,
    limit: 1,
  })
  const [popularParams, setPopularParams] = useState({
    skip: 0,
    // limit: 5,
    limit: 1,
  })
  const [newParams, setNewParams] = useState({
    skip: 0,
    // limit: 5,
    limit: 1,
  })

  const [language, setLanguage] = useState('JavaScript');
  
  useEffect(() => {
    loadRecipes(RecipeTypes.MOST_LIKED, mostLikedParams);
    loadRecipes(RecipeTypes.POPULAR, popularParams);
    loadRecipes(RecipeTypes.NEW, newParams);
  }, [])

  const handleSeeMore = (category, recipes) => () => {
    console.log('handling see more')
    navigation.push('RecipeList', { category });
  }

  // const getRecipeDetails = (item) => {
  //   let details = ''

  //   if (item.cookTimeMins) details += `${item.cookTimeMins} mins`
  //   if (item.calories) details += ` ᛫ ${item.calories} calories`

  //   return details;
  // }  

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>

      <View style={styles.container}>
        <SearchInput navigation={navigation} />
      </View>

      <View>
        <View style={styles.container}>
          <Text style={styles.subHeaderTitle}>Most Liked Recipes</Text>
        </View>

        <ScrollView 
          showsHorizontalScrollIndicator={false}
          horizontal= {true}
          style={styles.cardList}
        >
          {mostLikedRecipes.slice(0,15).map((item) => (
            <Card transparent key={item._id}>
              <CardItem cardBody>
                <View style={styles.cardImageContainer}>
                  <Thumbnail 
                    square 
                    source={{ uri: item.thumbnailUrl }} 
                    style={styles.cardImage}
                  />
                </View>
              </CardItem>
              <CardItem>
                <Body style={styles.card}>
                  <Text numberOfLines={1} style={styles.cardTitle}>{item.titleMain}</Text>            
                  <View style={styles.starRating}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={item.ratingValue || 4.5}
                      starSize={15}
                      fullStarColor={theme.fullStarColor}
                    />
                    <Text 
                      note 
                      numberOfLines={1} 
                      style={{ fontSize: 12, width: 90 }}>
                        {` ${item.ratingCount} ratings`}
                    </Text>                          
                  </View>                  
                </Body>
              </CardItem>
            </Card>
          ))}
        </ScrollView>
      </View>

      <View>
        <View style={styles.container}>
          <Text style={styles.subHeaderTitle}>Popular Collections</Text>
        </View>
        <ScrollView 
          showsHorizontalScrollIndicator={false}
          horizontal= {true}      
        >
          <View style={styles.popularCollectionsContainer}>
            {(popularCollections).map(collection => (
              <Button 
                key={collection}
                style={styles.popularCollectionButton}
              >
                <Text style={styles.popularCollectionButtonText}>{collection}</Text>
              </Button>
            ))}
          </View>
        </ScrollView>
      </View>

      <View>
        <View style={styles.container}>
          <View style={styles.listHeader}>
            <Text style={styles.subHeaderTitle}>Featured</Text>
            <Button 
              small
              dark
              transparent 
              onPress={handleSeeMore(RecipeTypes.POPULAR, popularRecipes)}
            >
              <Text style={styles.seeMoreText}>SEE MORE</Text>
            </Button>            
          </View>
        </View>
        <RecipeList 
          data={popularRecipes.slice(0,5)}
          isLoading={popularIsLoading}
          navigation={navigation}
          autoLoadMore={false}
        />
      </View>

      <View>
        <View style={styles.container}>
          <View style={styles.listHeader}>
            <Text style={styles.subHeaderTitle}>Popular</Text>
            <Button 
              small
              dark
              transparent 
              onPress={handleSeeMore(RecipeTypes.POPULAR, popularRecipes)}
            >
              <Text style={styles.seeMoreText}>SEE MORE</Text>
            </Button>
          </View>
        </View>
        <RecipeList 
          data={popularRecipes.slice(0,5)}
          isLoading={popularIsLoading}
          navigation={navigation}
          autoLoadMore={false}
        />
      </View>

      <View>
        <View style={styles.container}>
          <View style={styles.listHeader}>
            <Text style={styles.subHeaderTitle}>New</Text>
            <Button 
              small
              dark
              transparent 
              onPress={handleSeeMore(RecipeTypes.NEW, newRecipes)}
            >
              <Text style={styles.seeMoreText}>SEE MORE</Text>
            </Button>
          </View>
        </View>
        <RecipeList 
          data={newRecipes.slice(0,5)}
          isLoading={newIsLoading}
          navigation={navigation}
          autoLoadMore={false}
        />
      </View>
    </ScrollView>
  );
}

DiscoverScreen.navigationOptions = {
  headerTitle: (
    <Text 
      style={{ 
        fontSize: theme.fontSizeMd, 
        fontFamily: 'vincHand' }}
      >
        Made From Scratch
      </Text>
  )
};

const styles = StyleSheet.create({
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
  },
  cardImage: {
    borderRadius: 10, 
    height: 124, 
    width: 165
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
    fontWeight: theme.fontWeightHeavy,
    color: 'white'   
  },
  seeMoreText: {
    fontSize: theme.fontSizeXs, 
    fontWeight: theme.fontWeightMedium,
    paddingLeft: 0,
    paddingRight: 0,
  }
});

const mapStateToProps = state => ({
  mostLikedIsLoading: state.recipes.mostLikedIsLoading,
  newIsLoading: state.recipes.newIsLoading,
  popularIsLoading: state.recipes.popularIsLoading,
  mostLikedRecipes: getRecipes(state, RecipeTypes.MOST_LIKED),
  popularRecipes: getRecipes(state, RecipeTypes.POPULAR),
  newRecipes: getRecipes(state, RecipeTypes.NEW)
});

const mapDispatchToProps = dispatch => ({
  loadRecipes: (category, params, options) => dispatch(RecipeActions.loadRecipes(category, params, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverScreen);
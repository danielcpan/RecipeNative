import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import theme from '../constants/theme';
import StarRating from 'react-native-star-rating';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import { 
  Container,  
  Text,
  Icon,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Button,
  ListItem
} from 'native-base';
import SearchInput from '../components/SearchInput';
import RecipeList from '../components/RecipeList';
import { fetchRecipes } from '../actions/recipeActions';

const popularCollections = [
  'Beef', 'Fish', 'Lamb', 'Pork', 'Poultry', 'Shellfish', 'Vegetarian', 'African', 'American', 
  'Asian', 'British', 'Cajun Creole', 'Caribbean', 'Chinese', 'Eastern European', 'Egyptian', 
  'French', 'German', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Latin American', 
  'Mediterranean', 'Mexican', 'Middle Eastern', 'Moroccan', 'Nepalese', 'Southern', 'Spanish', 
  'Swedish', 'Thai', 'Vietnamese'
]

const DiscoverScreen = props => {
  const [mostLikedParams, setMostLikedParams] = useState({
    skip: 0,
    limit: 15,
  })
  const [popularParams, setPopularParams] = useState({
    skip: 0,
    limit: 5,
  })
  const [newParams, setNewParams] = useState({
    skip: 0,
    limit: 5,
  })
  const { mostLikedRecipes, popularRecipes, newRecipes, fetchRecipes } = props;
  // console.log(props.mostLiked)
  // console.log(mostLikedRecipes)
  // console.log(featuredRecipes)
  
  useEffect(() => {
    // getAllRecipes(params);
    fetchRecipes('most-liked', mostLikedParams);
    fetchRecipes('popular', popularParams);
    fetchRecipes('new', newParams);
  }, [])

  const handleEnd = () => {
    // setParams({ ...params, skip: params.skip += 15})
    // getAllRecipes(params)
  }  

  // console.log('test')
  // console.log(props.navigation)

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>

      <View style={styles.container}>
        <SearchInput />
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
          {mostLikedRecipes.recipes.map((item, idx) => (
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
                      starSize={10}
                      fullStarColor={theme.fullStarColor}
                    />
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
            <Text style={styles.seeMoreText}>SEE MORE</Text>
          </View>
        </View>
        <RecipeList 
          data={popularRecipes.recipes}
          isLoading={popularRecipes.isLoading}
          handleEnd={handleEnd}
          navigation={props.navigation}
          autoLoadMore={false}
        />
      </View>      

      <View>
        <View style={styles.container}>
          <View style={styles.listHeader}>
            <Text style={styles.subHeaderTitle}>Popular</Text>
            <Text style={styles.seeMoreText}>SEE MORE</Text>
          </View>
        </View>
        <RecipeList 
          data={popularRecipes.recipes}
          isLoading={popularRecipes.isLoading}
          handleEnd={handleEnd}
          navigation={props.navigation}
          autoLoadMore={false}
        />
      </View>

      <View>
        <View style={styles.container}>
          <View style={styles.listHeader}>
            <Text style={styles.subHeaderTitle}>New</Text>
            <Text style={styles.seeMoreText}>SEE MORE</Text>
          </View>
        </View>
        <RecipeList 
          data={newRecipes.recipes}
          isLoading={popularRecipes.isLoading}
          handleEnd={handleEnd}
          navigation={props.navigation}
          autoLoadMore={false}
        />
      </View>
    </ScrollView>
  );
}

DiscoverScreen.navigationOptions = {
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerRight: (
    <Icon 
      style={{ paddingRight: 15 }} 
      name={Platform.OS === 'ios' ? 'ios-more' : 'md-more-horiz'} 
    />
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
    fontWeight: theme.fontWeightHeavy    
  },
  seeMoreText: {
    fontSize: theme.fontSizeXs, 
    fontWeight: theme.fontWeightMedium    
  }
});

const mapStateToProps = state => ({
  mostLikedRecipes: {
    ...state.mostLikedRecipes
  },
  popularRecipes: {
    ...state.popularRecipes
  },
  newRecipes: {
    ...state.newRecipes
  },
});

const mapDispatchToProps = dispatch => ({
  fetchRecipes: (category, params) => dispatch(fetchRecipes(category, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverScreen);
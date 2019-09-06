import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import theme from '../constants/Styles';
import StarRating from 'react-native-star-rating';
import { ScrollView, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { 
  Container,  
  Text,
  Icon,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Right
} from 'native-base';
import SearchInput from '../components/SearchInput';
import RecipeList from '../components/RecipeList';
import { getAllRecipes, getMostLikedRecipes } from '../actions/recipeActions';


const SearchScreen = props => {
  const [params, setParams] = useState({
    skip: 0,
    limit: 15,
  })  
  const { recipes, mostLikedRecipes, getAllRecipes, getMostLikedRecipes } = props;
  // console.log(mostLikedRecipes)
  
  useEffect(() => {
    getAllRecipes(params);
    getMostLikedRecipes(params);
  }, [])

  const handleEnd = () => {
    // setParams({ ...params, skip: params.skip += 15})
    // getAllRecipes(params)
  }  

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Search</Text>
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
          {mostLikedRecipes.map((item, idx) => (
            // <TouchableOpacity key={item._id}>
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
            // </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View>
        <View style={styles.container}>
          <View style={styles.listHeader}>
            <Text style={styles.subHeaderTitle}>Popular</Text>
            <Text style={{ fontSize: theme.fontSizeXs, fontWeight: theme.fontWeightLight}}>SEE MORE</Text>
          </View>
        </View>
        <RecipeList 
          data={recipes}
          handleEnd={handleEnd}
          />
      </View>
    </ScrollView>
  );
}

SearchScreen.navigationOptions = {
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
  }
});

const mapStateToProps = state => ({
  recipes: state.recipes.cookBook,
  mostLikedRecipes: state.recipes.mostLikedRecipes,
});

const mapDispatchToProps = dispatch => ({
  getAllRecipes: params => dispatch(getAllRecipes(params)),
  getMostLikedRecipes: params => dispatch(getMostLikedRecipes(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
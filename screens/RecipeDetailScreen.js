import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import theme from '../constants/Styles';
import StarRating from 'react-native-star-rating';
import { ScrollView, View, Image, StyleSheet, Platform } from 'react-native';
import { 
  Container,  
  Text,
  Icon,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Right,
  Tabs,
  Tab,
  ListItem,
  Left
} from 'native-base';
import SearchInput from '../components/SearchInput';
import RecipeList from '../components/RecipeList';
import { getAllRecipes, getMostLikedRecipes } from '../actions/recipeActions';


const RecipeDetailScreen = props => {
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
        <View>
          <Text style={styles.headerTitle}>Spicy Scrambled Egg Tacos</Text>
          <Text note style={styles.subHeaderTitle}>with Spicy Scrambled Egg Tacos</Text>        
        </View>
        <View>
          <Text style={{ paddingTop: 7.5}}>Test</Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', ...theme.padding(7.5, 15, 7.5, 15)}}>
        <View style={styles.starRating}>
          <StarRating
            maxStars={5}
            rating={4.5}
            starSize={16}
            fullStarColor={theme.fullStarColor}
            editing={true}
          />
        </View>
        <View>
          <Text note style={{paddingLeft: 7.5, fontSize: theme.fontSizeXs}}>(288 Ratings)</Text>
        </View>
        <View style={{flex: 1, alignSelf: 'flex-end'}}>
          <Icon name={'ios-heart'} style={{ fontSize: theme.fontSizeSm}}/>
        </View>
      </View>

      <View>
        <Image 
          source={{ uri: 'https://media.blueapron.com/recipes/22422/square_newsletter_images/1565123739-33-0010-1624/0909_2PP_Gochujang-Glazed-Chicken_020_Square_Web_hi_res.jpg'}} 
          style={{ height: 275, width: '100%' }}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...theme.padding(7.5, 30)}}>
        <View style={{alignItems: 'center'}}>
          <Text note>Time</Text>
          <Text style={{ fontWeight: theme.fontWeightHeavy}}>30 min</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text note>Servings</Text>
          <Text style={{ fontWeight: theme.fontWeightHeavy}}>2</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text note>Nutrition</Text>
          <Text style={{ fontWeight: theme.fontWeightHeavy}}>600 Cal</Text>
        </View>        
      </View>

      <View style={{ ...theme.padding(7.5, 15)}}>
        <View style={{...theme.padding(7.5, 0)}}>
          <Text note>Description</Text>  
        </View>
        <View>
          <Text numberOfLines={5} style={{fontSize: theme.fontSizeXs}}>
            This comforting dish pairs warm homemade biscuits with rich seared steaks—coated in a blend of bold Cajun-style spices, then topped with a dollop of sweet, creamy maple butter. When forming the biscuit dough, you’ll want to gently stir the ingredients together until they are just combined, which will help develop their characteristically light and flaky texture.
          </Text>
        </View>
      </View>

      <View style={{paddingTop: 10}}>
        <Tabs initialPage={0} tabBarUnderlineStyle={{ backgroundColor: theme.primaryColor}}>
          <Tab heading='Ingredients' activeTextStyle={{ color: theme.primaryColor}}>
          <View>
            <Image 
              source={{ uri: 'https://media.blueapron.com/recipes/22422/ingredient_images/1565193512-33-0116-0666/0909_ING_LAUREN_2PP_W01_large_feature.png'}} 
              style={{ height: 250, width: '100%', resizeMode: 'center'}}
            />
          </View>
            <ListItem>
              <Body>
                <Text>2 Steaks</Text>
              </Body>
            </ListItem>
          <ListItem>
              <Body>
                <Text>2 Scallions</Text>
              </Body>
            </ListItem>          
          <ListItem>
              <Body>
                <Text>½ lb Broccoli</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>½ cup Biscuit Mix</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>2 Tbsps Butter</Text>
              </Body>
            </ListItem>                                  
            <ListItem>
              <Body>
                <Text>2 Tbsps Fromage Blanc</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>2 Tbsps Maple Syrup</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>2 Tbsps Sliced Roasted Almonds</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text>1 Tbsp Cajun Spice Blend (Smoked Paprika, Ground Yellow Mustard, Onion Powder, Garlic Powder, Whole Dried Oregano, Whole Dried Thyme & Cayenne Pepper)</Text>
              </Body>
            </ListItem>                                    
          </Tab>
          <Tab heading='Instructions' activeTextStyle={{ color: theme.primaryColor}}>

          </Tab>

        </Tabs>
      </View>

    </ScrollView>
  );
}

RecipeDetailScreen.navigationOptions = {
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerRight: (
    <Icon 
      style={{ paddingRight: 15 }} 
      name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'} 
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
    display: 'flex', 
    justifyContent: 'space-between', 
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  starRating: {
    flexDirection: 'row',
    // alignItems: 'center',
    // ...theme.padding(7.5, 15, 7.5, 15),
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailScreen);
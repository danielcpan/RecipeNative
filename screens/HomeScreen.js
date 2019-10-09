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
  ImageBackground
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
} from 'native-base';

import * as RecipeTypes from '../constants/recipeTypes';
import * as RecipeActions from '../actions/recipeActions';
import { getRecipes } from '../reducers/recipeReducer';

const HomeScreen = props => {
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
  const { mostLikedRecipes, fetchRecipes } = props;

  useEffect(() => {
    // fetchRecipes('new', newParams);
    // fetchRecipes('popular', popularParams);
    fetchRecipes(RecipeTypes.MOST_LIKED, mostLikedParams);
  }, [])

  const handleEnd = () => {
    setParams({ ...params, skip: params.skip += 15})
    // fetchRecipes('featured', params)
  }

  return (
    <ScrollView>
      {/* <View style={{backgroundColor: 'black'}}>
        <ImageBackground source={{uri: 'https://images.summitmedia-digital.com/yummyph/images/2016/08/01/IG-main.jpg'}} style={styles.hero}>
          <View>
            <Text style={{color: 'white'}}>Hello</Text>
          </View>
        </ImageBackground>
      </View> */}
      
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Chef's Feed</Text>
      </View>

      <View>
        <View style={styles.container}>
          <Text style={styles.subHeaderTitle}>Daily Suggested</Text>
        </View>

        {/* <View style={{backgroundColor: 'black'}}>
          <ImageBackground source={{uri: 'https://media.blueapron.com/recipes/2351/square_newsletter_images/1497640840-4-0006-0704/626_2PM_Seared-Pork-Mustard-Sauce_WEB_SQ_hi_res.jpg'}} style={styles.hero}>
            <View>
              <Text style={{color: 'white'}}>Hello</Text>
            </View>
          </ImageBackground>
        </View> */}

        <ScrollView 
          showsHorizontalScrollIndicator={false}
          horizontal= {true}
          style={styles.cardList}
        >
          {mostLikedRecipes.map((item, idx) => (
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
      
      {[1,2,3,4,5,6].map(item => (
        <Card style={{flex: 1}} key={item}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-1/p200x200/15977820_1495100137199563_3314784849364231268_n.jpg?_nc_cat=1&_nc_oc=AQm9fN4ebN3g_gjJ9RXBLc4OFukrA5S0mDKK2LvAC1IaAp1AGRgb1LaWetZRuJDRs8fcCLfyqu2e_TS6-yjxHP0A&_nc_ht=scontent-sjc3-1.xx&oh=da566cf5a3ec9c3e37e76a4826937543&oe=5DCA1B70'}} />
              <Body>
                <Text>NativeBase</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
          <Body>
            <Image source={{uri: 'https://images.summitmedia-digital.com/yummyph/images/2016/08/01/IG-main.jpg'}} style={{height: 200, width: '100%', flex: 1}}/>
            <Text>
              Description here
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{color: '#87838B'}}>
              <Icon name="logo-github" />
              <Text>1,926 stars</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
    ))}
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  headerTitle: <Text style={{ fontSize: theme.fontSizeMd, fontFamily: 'vincHand' }}>Made From Scratch</Text>,
  headerStyle: {
    borderBottomWidth: 0,
  },
};

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
  // mostLikedRecipes: {
  //   ...state.mostLikedRecipes
  // },
  mostLikedRecipes: getRecipes(state, RecipeTypes.MOST_LIKED)
});

const mapDispatchToProps = dispatch => ({
  fetchRecipes: (category, params, options) => dispatch(RecipeActions.fetchRecipes(category, params, options))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

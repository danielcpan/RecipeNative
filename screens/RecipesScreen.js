import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Platform,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  // Text,
  // TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
// import StarRating from 'react-native-star-rating';

import { Container, Tab, Tabs, List, Content, ListItem, Thumbnail, Text, Left, Body, Right, Icon } from 'native-base';
import RecipeList from '../components/RecipeList';
import { getRecipes } from '../actions/recipeActions';

const RecipesScreen = props => {
  const [params, setParams] = useState({
    skip: 0,
    limit: 15,
  })
  const { recipes, getRecipes } = props;

  useEffect(() => {
    getRecipes(params);
  }, [])

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  const handleEnd = () => {
    setParams({ ...params, skip: params.skip += 15})
    getRecipes(params)
  }

  return (
    <Container>
    {/* // <View style={{ display: 'flex', justifyContent: 'center' }}> */}
      <View style={{backgroundColor: 'black'}}>
        <ImageBackground source={{uri: 'https://images.summitmedia-digital.com/yummyph/images/2016/08/01/IG-main.jpg'}} style={styles.hero}>
          <View>
            <Text style={{color: 'white'}}>Hello</Text>
          </View>
        </ImageBackground>
      </View>
      <Tabs initialPage={0}>
        <Tab heading="Featured">
          <RecipeList 
            data={recipes}
            handleEnd={handleEnd}
          />
        </Tab>
        <Tab heading="Popular">
        </Tab>
        <Tab heading="New">
        </Tab>
      </Tabs>
      {/* </View> */}
    </Container>
  );
}

RecipesScreen.navigationOptions = {
  title: 'Recipes',
};

const styles = StyleSheet.create({
  hero: {
    height: 0.20 * Dimensions.get("window").height,
    // height: 50,
    opacity: 0.5,
    // backgroundColor: 'black',
    width: null, 
    // flex: 1
  },
});

const mapStateToProps = state => ({
  recipes: state.recipes.cookBook,
});

const mapDispatchToProps = dispatch => ({
  getRecipes: params => dispatch(getRecipes(params))
});

export default connect( mapStateToProps, mapDispatchToProps)(RecipesScreen);

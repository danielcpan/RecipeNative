import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ImageBackground,
  View,
  Dimensions
} from 'react-native';
import { 
  Container, 
  Tab, 
  Tabs, 
  Text 
} from 'native-base';
import RecipeList from '../components/RecipeList';
import { getAllRecipes } from '../actions/recipeActions';

const RecipesScreen = props => {
  const [params, setParams] = useState({
    skip: 0,
    limit: 15,
  })
  const { recipes, getAllRecipes } = props;

  useEffect(() => {
    // getAllRecipes(params);
  }, [])

  const handleEnd = () => {
    setParams({ ...params, skip: params.skip += 15})
    getAllRecipes(params)
  }

  return (
    <Container>
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
    </Container>
  );
}

RecipesScreen.navigationOptions = {
  title: 'Recipes',
};

const styles = StyleSheet.create({
  hero: {
    height: 0.20 * Dimensions.get("window").height,
    opacity: 0.5,
    width: null, 
  },
});

const mapStateToProps = state => ({
  recipes: state.recipes.cookBook,
});

const mapDispatchToProps = dispatch => ({
  getAllRecipes: params => dispatch(getAllRecipes(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesScreen);

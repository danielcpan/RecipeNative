import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Platform,
  // ScrollView,
  StyleSheet,
  // Text,
  // TouchableOpacity,
  // View,
  Dimensions
} from 'react-native';

import { Container, List, Content, ListItem, Thumbnail, Text, Left, Body, Right, Icon } from 'native-base';

import { getRecipes } from '../actions/recipeActions';

const RecipesScreen = props => {
  const { recipes, getRecipes } = props;

  useEffect(() => {
    getRecipes();
  }, [])

  return (
    <Container>
      <Content>
        <Image source={{uri: 'https://images.summitmedia-digital.com/yummyph/images/2016/08/01/IG-main.jpg'}} style={styles.hero} />
        <List>
          {recipes.map(recipe => (
            <ListItem thumbnail noBorder key={recipe.nameId} >
              <Left>
                <Thumbnail square source={{ uri: recipe.mainImage }} style={{ borderRadius: 10 }}/>
              </Left>
              <Body>
                <Text style={{fontWeight: 'bold'}}>{recipe.titleMain}</Text>
                <Text note numberOfLines={1}>{recipe.titleSub}</Text>
              </Body>
              <Right>
                {(recipe.cookTimeMins) && (
                  <>
                    <Icon name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'} />
                    <Text>{recipe.cookTimeMins} min</Text>
                  </>
                )}
              </Right>
            </ListItem>            
          ))}
        </List>
      </Content>    
    </Container>
  );
}

RecipesScreen.navigationOptions = {
  title: 'Recipes',
};

const styles = StyleSheet.create({
  hero: {
    height: 0.25 * Dimensions.get("window").height,
    width: null, 
    flex: 1
  },
});

const mapStateToProps = state => ({
  recipes: state.recipes.cookBook,
});

const mapDispatchToProps = dispatch => ({
  getRecipes: () => dispatch(getRecipes())
});

export default connect( mapStateToProps, mapDispatchToProps)(RecipesScreen);

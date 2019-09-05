import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Platform,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  // Text,
  // TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

import { Container, Tab, Tabs, List, Content, ListItem, Thumbnail, Text, Left, Body, Right, Icon } from 'native-base';

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
      {/* <Content> */}
      {/* <Content onScroll={debounce(({ nativeEvent }) => {
        // if (isCloseToBottom(nativeEvent)) {
            // setParams({ ...params, skip: params.skip += 15})
            // getRecipes(params)
            // console.log(params)
            console.log("closeTobottom!")
        // }
      }, 1000)}> */}
      {/* <Content onScroll={e => {
        // console.log(e.nativeEvent)
        // e.persist()
        if (debounce(isCloseToBottom(e.nativeEvent), 500)) {
            setParams({ ...params, skip: params.skip += 15})
            getRecipes(params)
            // console.log(params)
            console.log("closeTobottom!")
        }
      }}> */}
      <Image source={{uri: 'https://images.summitmedia-digital.com/yummyph/images/2016/08/01/IG-main.jpg'}} style={styles.hero} />
      {/* <Content> */}
      <Tabs initialPage={0}>
        <Tab heading="This Weeks">
          <FlatList 
            data={[...recipes]}
            // keyExtractor={(x, i) => i}
            onEndReached={() => handleEnd()}
            onEndReachedThreshold={0}
            ListFooterComponent={() => <ActivityIndicator size='large' animating/>}
            renderItem={({ item }) => (
              <ListItem thumbnail noBorder key={item.nameId} style={{height: 75}}>
                <Left>
                  <Thumbnail square source={{ uri: item.thumbnailUrl }} style={{ borderRadius: 10 }}/>
                </Left>
                <Body>
                  <Text style={{fontWeight: 'bold'}}>{item.titleMain}</Text>
                  <Text note numberOfLines={1}>{item.titleSub}</Text>
                </Body>
                <Right>
                  {(item.cookTimeMins) && (
                    <>
                      <Icon name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'} />
                      <Text>{item.cookTimeMins} min</Text>
                    </>
                  )}
                </Right>
              </ListItem>              
            )}
          />
          {/* <Content style={{display: 'relative', flex: 0}}> */}
          {/* <List>
            {recipes.map(recipe => (
              <ListItem thumbnail noBorder key={recipe.nameId} style={{height: 75}}>
                <Left>
                  <Thumbnail square source={{ uri: recipe.thumbnailUrl }} style={{ borderRadius: 10 }}/>
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
          </List> */}
          {/* </Content> */}
        </Tab>
        <Tab heading="Featured">
        </Tab>
        <Tab heading="Most Popular">
        </Tab>
      </Tabs>
      {/* </Content> */}
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

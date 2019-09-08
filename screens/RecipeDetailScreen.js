import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import theme from '../constants/theme';
import StarRating from 'react-native-star-rating';
import { ScrollView, View, Image, StyleSheet, Platform } from 'react-native';
import { 
  Text,
  Icon,
  Body,
  Tabs,
  Tab,
  ListItem,
} from 'native-base';

import { fetchRecipeDetails } from '../actions/recipeActions';

const RecipeDetailScreen = props => {
  const { _id, titleMain, titleSub, author, calories, cookTimeMins, ratingCount, ratingValue, servings, thumbnailUrl} = props.navigation.state.params;
  const { 
    recipe: { 
      description, 
      ingredientsImageUrl, 
      ingredients = [], 
      instructions = []
    }, 
    fetchRecipeDetails 
  } = props;
  
  useEffect(() => {
    fetchRecipeDetails(_id)
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerTitle}>{titleMain}</Text>
          <Text note style={styles.subHeaderTitle}>{titleSub}</Text>        
        </View>
        <View>
          <Text style={{ paddingTop: 7.5}}>Test</Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', ...theme.padding(7.5, 15, 7.5, 15)}}>
        <View style={styles.starRating}>
          <StarRating
            maxStars={5}
            rating={ratingValue}
            starSize={16}
            fullStarColor={theme.fullStarColor}
            editing={true}
          />
        </View>
        <View>
          <Text note style={{paddingLeft: 7.5, fontSize: theme.fontSizeXs}}>({ratingCount} Ratings)</Text>
        </View>
        <View style={{flex: 1, alignSelf: 'flex-end'}}>
          <Icon name={'ios-heart'} style={{ fontSize: theme.fontSizeSm}}/>
        </View>
      </View>

      <View>
        <Image 
          source={{ uri: thumbnailUrl}} 
          style={{ height: 275, width: '100%' }}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', ...theme.padding(7.5, 30)}}>
        <View style={{alignItems: 'center'}}>
          <Text note>Time</Text>
          <Text style={{ fontWeight: theme.fontWeightHeavy}}>{cookTimeMins} mins</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text note>Servings</Text>
          <Text style={{ fontWeight: theme.fontWeightHeavy}}>{servings}</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text note>Nutrition</Text>
          <Text style={{ fontWeight: theme.fontWeightHeavy}}>{calories} Cal</Text>
        </View>        
      </View>

      <View style={{ ...theme.padding(7.5, 15)}}>
        <View style={{...theme.padding(7.5, 0)}}>
          <Text note>Description</Text>  
        </View>
        <View>
          <Text numberOfLines={5} style={{fontSize: theme.fontSizeXs}}>
            {description}
          </Text>
        </View>
      </View>

      <View style={{paddingTop: 10}}>
        <Tabs initialPage={0} tabBarUnderlineStyle={{ backgroundColor: theme.primaryColor}}>
          <Tab heading='Ingredients' activeTextStyle={{ color: theme.primaryColor}}>
          <View>
            <Image 
              source={{ uri: ingredientsImageUrl }} 
              style={{ height: 250, width: '100%', resizeMode: 'center'}}
            />
          </View>
            {(ingredients.map(ingredient => (
            <ListItem key={ingredient}>
              <Body>
                <Text>{ingredient}</Text>
              </Body>
            </ListItem>
          )))}
          </Tab>
          <Tab heading='Instructions' activeTextStyle={{ color: theme.primaryColor}}>
            {(instructions.map((instruction, idx) => (
              <ListItem key={instruction._id}>
                <Body>
                  <View style={{ flexDirection: 'row', ...theme.padding(7.5, 0)}}>
                    <View style={{ backgroundColor: theme.primaryBackgroundColor, height: 25, width: 25, borderRadius: 20}}>
                      <Text>{idx + 1}</Text>
                    </View>

                    <View>
                      <Text>{instruction.stepTitle}</Text>
                    </View>
                  </View>

                  <View style={{ ...theme.margin(7.5, -15), padding: 0}}>
                    <Image 
                      source={{ uri: instruction.stepImage }} 
                      style={{ height: 250, width: '100%', resizeMode: 'cover', zIndex: 10000}}
                    />                
                  </View>

                  <View style={{...theme.padding(7.5, 0)}}>
                      <Text>{instruction.stepText}</Text>
                  </View>
                </Body>
              </ListItem>
            )))}                        
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
  recipe: state.recipeDetails.recipe,
});

const mapDispatchToProps = dispatch => ({
  fetchRecipeDetails: _id => dispatch(fetchRecipeDetails(_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailScreen);
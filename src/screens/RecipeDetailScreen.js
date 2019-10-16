import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import theme from '../constants/theme';
import StarRating from 'react-native-star-rating';
import { ScrollView, View, Image, StyleSheet, Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import { 
  Text,
  Icon,
  Tabs,
  Tab,
  Button,
} from 'native-base';

import IngredientsTab from '../components/IngredientsTab';
import InstructionsTab from '../components/InstructionsTab';
import RecipeDetailsInfoSection from '../components/RecipeDetailsInfoSection';
import * as RecipeActions from '../actions/recipeActions';
import { getRecipe } from '../reducers/recipeReducer';

const RecipeDetailScreen = props => { 
  const { 
    isLoading, 
    hasErrored, 
    error, 
    recipe, 
    loadRecipe,
    navigation: {
      state: {
        params: {
          _id, 
          titleMain, 
          titleSub, 
          author, 
          calories, 
          cookTimeMins, 
          ratingCount, 
          ratingValue, 
          servings, 
          thumbnailUrl, 
          description, 
          ingredientsImageUrl,
          ingredients,
          instructions,
        }
      }
    }
  } = props;
  
  useEffect(() => {
    const requiredFields =  [
      'titleMain',
      'titleSub',
      'author', 
      'calories', 
      'cookTimeMins', 
      'ratingCount', 
      'ratingValue', 
      'servings', 
      'thumbnailUrl', 
      'description', 
      'ingredientsImageUrl',
      'ingredients',
      'instructions',      
    ]
    loadRecipe(_id, requiredFields);
  }, [])

  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerTitle}>{titleMain || (recipe && recipe.titleMain)}</Text>
          <Text note style={styles.subHeaderTitle}>{titleSub || (recipe && recipe.titleSub)}</Text>        
        </View>
      </View>

      <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignContent: 'center', alignItems: 'flex-end', ...theme.padding(0, 15, 7.5)}}>
        <View style={styles.starRating}>
          <StarRating
            maxStars={5}
            rating={ratingValue || (recipe && recipe.ratingValue)}
            starSize={24}
            fullStarColor={theme.fullStarColor}
            editing={true}
          />
          <Text note style={{paddingLeft: 7.5, fontSize: theme.fontSizeXs, alignSelf: 'flex-end'}}>({ratingCount || (recipe && recipe.ratingCount)} Ratings)</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setIsFavorite(prevState => !prevState)}>
            <Icon 
              name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
              style={{ fontSize: theme.fontSizeMd, color: isFavorite ? 'red' : 'black'}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Image 
          source={{ uri: thumbnailUrl}} 
          style={{ height: 275, width: '100%' }}
        />
      </View>
      
      <View style={{ ...theme.padding(7.5, 30) }}>
        <RecipeDetailsInfoSection 
          cookTimeMins={cookTimeMins || (recipe && recipe.cookTimeMins)}
          servings={servings || (recipe && recipe.servings)}
          calories={calories || (recipe && recipe.calories)}
        />
      </View>

      <View style={{ ...theme.padding(7.5, 15)}}>
        <View style={{...theme.padding(7.5, 0)}}>
          <Text note>Description</Text>
        </View>
        <View>
          <Text numberOfLines={5} style={{fontSize: theme.fontSizeXs}}>
            {description || (recipe && recipe.description)}
          </Text>
        </View>
      </View>

      <View style={{paddingTop: 10}}>
        <Tabs initialPage={0} tabBarUnderlineStyle={{ backgroundColor: theme.primaryColor}}>
          <Tab heading='Ingredients' activeTextStyle={{ color: theme.primaryColor}}>
            <IngredientsTab 
              ingredientsImageUrl={ingredientsImageUrl || (recipe && recipe.ingredientsImageUrl)}
              ingredients={ingredients || (recipe && recipe.ingredients)}
              isLoading={isLoading}
            />
          </Tab>
          <Tab heading='Instructions' activeTextStyle={{ color: theme.primaryColor}}>
            <InstructionsTab 
              instructions={instructions || (recipe && recipe.instructions)}
              isLoading={isLoading}
            />
          </Tab>
        </Tabs>
      </View>
    </ScrollView>
  );
}

RecipeDetailScreen.navigationOptions = (props) => ({

});

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
  isLoading: state.recipes.isLoading,
  hasErroed: state.recipes.hasErroed,
  error: state.recipes.error,
  recipe: getRecipe(state),
});

const mapDispatchToProps = dispatch => ({
  loadRecipe: (_id, options) => dispatch(RecipeActions.loadRecipe(_id, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailScreen);
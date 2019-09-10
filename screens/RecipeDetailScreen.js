import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import theme from '../constants/theme';
import StarRating from 'react-native-star-rating';
import { ScrollView, View, Image, StyleSheet, Platform, Button, ActivityIndicator } from 'react-native';
import { 
  Text,
  Icon,
  Body,
  Tabs,
  Tab,
  ListItem,
  Content,
} from 'native-base';

import IngredientsTab from '../components/IngredientsTab';
import InstructionsTab from '../components/InstructionsTab';
import RecipeDetailsInfoSection from '../components/RecipeDetailsInfoSection';
import { resetRecipeDetails ,fetchRecipeDetails } from '../actions/recipeActions';

const RecipeDetailScreen = props => {
  const { 
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
  } = props.navigation.state.params;
  const { 
    recipeDetails: {
      recipe: {
        ingredients = [], 
        instructions = [],
      },
      isLoading,
      hasErroed,
      error,
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
      
      <View style={{ ...theme.padding(7.5, 30) }}>
        <RecipeDetailsInfoSection 
          cookTimeMins={cookTimeMins}
          servings={servings}
          calories={calories}
        />
      </View>

      <View style={{ ...theme.padding(7.5, 15)}}>
        <View style={{...theme.padding(7.5, 0)}}>
          <Text note>Description</Text>
        </View>
        <View>
          <Text numberOfLines={5} style={{fontSize: theme.fontSizeXs}}>
            {description}
          </Text>
          {/* {(isLoading) ? <ActivityIndicator animating /> : (
            <Text numberOfLines={5} style={{fontSize: theme.fontSizeXs}}>
              {description}
            </Text>
          )} */}
        </View>
      </View>

      <View style={{paddingTop: 10}}>
        <Tabs initialPage={0} tabBarUnderlineStyle={{ backgroundColor: theme.primaryColor}}>
          <Tab heading='Ingredients' activeTextStyle={{ color: theme.primaryColor}}>
            <IngredientsTab 
              ingredientsImageUrl={ingredientsImageUrl}
              ingredients={ingredients}
              isLoading={isLoading}
            />
          </Tab>
          <Tab heading='Instructions' activeTextStyle={{ color: theme.primaryColor}}>
            <InstructionsTab 
              instructions={instructions}
              isLoading={isLoading}
            />
          </Tab>
        </Tabs>
      </View>
    </ScrollView>
  );
}

// let BackButton = props => {
//   console.log(props)
//   return (
//     <Icon 
//       name='ios-arrow-back'
//     />
//     // <Button 
//     //   icon={
//     //     <Icon
//     //       name='ios-arrow-back'
//     //       size={10}
//     //     />
//     //   }
//     //   onPress={() => {
//     //     props.resetRecipeDetails();
//     //     props.navigation.goBack();
//     //   }}
//     //   title='Back'
//     //   color={theme.primaryColor}      
//     // />
//   )
// }

// const mapDispatchToProps2 = dispatch => ({
//   resetRecipeDetails: () => dispatch(resetRecipeDetails()),
// })

// BackButton = connect(null, mapDispatchToProps2)(BackButton);

RecipeDetailScreen.navigationOptions = props => ({
  headerStyle: {
    borderBottomWidth: 0,
  },
  // headerLeft: (
  //   // <BackButton navigation={props.navigation}/>
  //   <Button
  //     onPress={() => {
  //       console.log(props)
  //       // props.resetRecipeDetails();
  //       props.navigation.goBack();
  //     }}
  //     title='Test'
  //     color={theme.primaryColor}
  //   />
  // ),  
  headerRight: (
    <Icon 
      style={{ paddingRight: 15 }} 
      name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'} 
    />
  )
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
  recipeDetails: {
    ...state.recipeDetails
  },
});

const mapDispatchToProps = dispatch => ({
  // resetRecipeDetails: () => dispatch(resetRecipeDetails()),
  fetchRecipeDetails: _id => dispatch(fetchRecipeDetails(_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailScreen);
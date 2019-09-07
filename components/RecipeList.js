import React from 'react';
import StarRating from 'react-native-star-rating';
import {
  Platform,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import { 
  ListItem, 
  Thumbnail, 
  Text, 
  Left, 
  Body, 
  Right, 
  Icon 
} from 'native-base';

const RecipeList = props => {
  const { data, isLoading, handleEnd, navigation, autoLoadMore } = props;
  // console.log("data")
  // console.log(data)
  // console.log('test')
  // console.log(props.navigation)

  return (
    <FlatList 
    data={[...data]}
    keyExtractor={x => x._id}
    onEndReached={() => autoLoadMore ? handleEnd() : null }
    onEndReachedThreshold={0}
    ListFooterComponent={() => (isLoading) ? <ActivityIndicator animating/> : null}
    renderItem={({ item }) => (
      <ListItem 
        onPress={() => navigation.push('RecipesDetails', item)}
        thumbnail 
        noBorder 
        style={{height: 75}}
      >
        <Left>
          <Thumbnail square source={{ uri: item.thumbnailUrl }} style={{ borderRadius: 10, height: 60, width: 60 }}/>
        </Left>
        <Body>
          <Text style={{fontWeight: 'bold'}}>{item.titleMain}</Text>
          <Text note numberOfLines={1}>{item.titleSub}</Text>
          <View style={{ flexDirection: 'row'}}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={item.ratingValue}
              starSize={10}
              fullStarColor={'#f8ce0b'}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </View>
        </Body>
        <Right>
          {(item.cookTimeMins) && (
            <View>
              <Icon name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'} style={{textAlign: 'center'}}/>
              <Text>{item.cookTimeMins} min</Text>
            </View>
          )}
        </Right>
      </ListItem>              
    )}
  />    
  )
}

export default RecipeList;
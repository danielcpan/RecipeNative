import React from 'react';
import StarRating from 'react-native-star-rating';
import {
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
} from 'native-base';
import theme from '../constants/theme';

const RecipeList = props => {
  const { 
    data, 
    isLoading, 
    handleEnd, 
    navigation, 
    autoLoadMore 
  } = props;

  return (
    <FlatList 
    data={[...data]}
    keyExtractor={x => x._id}
    onEndReached={() => autoLoadMore ? handleEnd() : null }
    onEndReachedThreshold={0}
    ListFooterComponent={() => (isLoading) ? <ActivityIndicator animating /> : null}
    renderItem={({ item }) => (
      <ListItem 
        onPress={() => navigation.push('RecipeDetails', item)}
        thumbnail 
        noBorder 
        style={{height: 75}}
      >
        <Left>
          <Thumbnail square source={{ uri: item.thumbnailUrl }} style={{ borderRadius: 10, height: 60, width: 60 }}/>
        </Left>
        <Body>
          <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{item.titleMain}</Text>
          <Text note numberOfLines={1}>{item.titleSub}</Text>
          <View style={{ flexDirection: 'row'}}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={item.ratingValue}
              starSize={15}
              // fullStarColor={'#f8ce0b'}
              fullStarColor={theme.fullStarColor}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
            <Text 
              note 
              numberOfLines={1}
            >
              {` ${item.ratingCount} ratings`}
            </Text>
          </View>
        </Body>
      </ListItem>              
    )}
  />    
  )
}

export default RecipeList;
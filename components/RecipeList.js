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
  const { data, handleEnd } = props;

  return (
    <FlatList 
    data={[...data]}
    keyExtractor={(x, i) => x._id}
    onEndReached={() => handleEnd()}
    onEndReachedThreshold={0}
    ListFooterComponent={() => <ActivityIndicator size='large' animating/>}
    renderItem={({ item }) => (
      <ListItem thumbnail noBorder key={item.nameId} style={{height: 75}}>
        <Left>
          <Thumbnail square source={{ uri: item.thumbnailUrl }} style={{ borderRadius: 10, height: 60, width: 60 }}/>
        </Left>
        <Body>
          <Text style={{fontWeight: 'bold'}}>{item.titleMain}</Text>
          <Text note numberOfLines={1}>{item.titleSub}</Text>
          <View style={{ flexDirection: 'row'}}>
            <StarRating
              disabled={false}
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
import React from 'react';
import {
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { 
  ListItem, 
  Thumbnail, 
  Text, 
  Left, 
  Body, 
} from 'native-base';

const RecipeSearchList = props => {
  const { data, isLoading, handleEnd, navigation, autoLoadMore } = props;
  
  return (
    <FlatList 
    data={[...data]}
    keyExtractor={x => x._id}
    onEndReached={() => autoLoadMore ? handleEnd() : null }
    onEndReachedThreshold={0}
    ListFooterComponent={() => (isLoading) ? <ActivityIndicator animating /> : null}
    renderItem={({ item }) => (
      <ListItem 
        onPress={() => navigation.push('RecipesDetails', item)}
        thumbnail 
        noBorder 
        style={{height: 55}}
      >
        <Left>
          <Thumbnail 
            square 
            source={{ uri: item.thumbnailUrl }} 
            style={{ borderRadius: 10, height: 40, width: 40 }}/>
        </Left>
        <Body>
          <Text style={{fontWeight: 'bold'}}>{item.titleMain}</Text>
          <Text note numberOfLines={1}>{item.titleSub}</Text>
        </Body>
      </ListItem>              
    )}
  />    
  )
}

export default RecipeSearchList;
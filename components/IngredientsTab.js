import React from 'react';
import { 
  View, 
  Image, 
  ActivityIndicator
} from 'react-native';
import { 
  Text,
  Body,
  ListItem,
  Content,
} from 'native-base';


const IngredientsTab = props => {
  const { ingredientsImageUrl, ingredients = [], isLoading } = props;

  return (
    <View>
      {(isLoading) ? <ActivityIndicator animating style={{paddingTop: 15}} /> : (
        <>
          <View>
            <Image 
              source={{ uri: ingredientsImageUrl || null }} 
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
        </>
      )}
    </View>
  );

  // return (
  //   <>
  //     <View>
  //       <Image 
  //         source={{ uri: ingredientsImageUrl }} 
  //         style={{ height: 250, width: '100%', resizeMode: 'center'}}
  //       />
  //     </View>
  //     {(ingredients.map(ingredient => (
  //       <ListItem key={ingredient}>
  //         <Body>
  //           <Text>{ingredient}</Text>
  //         </Body>
  //       </ListItem>
  //     )))}
  //   </>
  // );
}

export default IngredientsTab;
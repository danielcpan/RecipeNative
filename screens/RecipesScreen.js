import React from 'react';
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

export default function RecipesScreen() {
  return (
    <Container>
      <Content>
        <Image source={{uri: 'https://images.summitmedia-digital.com/yummyph/images/2016/08/01/IG-main.jpg'}} style={styles.hero} />
        <List>
          {[1,2,3,4,5,6,7,8,9, 10, 11, 12, 13].map(el => (
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'https://media.blueapron.com/recipes/593/square_newsletter_images/20150115-2109-1977-6951/FP_111214_3_20Sloppy_20Joe_20__20Roasted_20Steak_20Fries_20-_202701_20SQ_hi_res.jpg' }} />
              </Left>
              <Body>
                <Text>Sloppy Joes & Roasted Steak Fries</Text>
                <Text note numberOfLines={1}>with Creamy Kale & Carrot Salad</Text>
              </Body>
              <Right>
                <Icon name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'} />
                <Text>55 min</Text>
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

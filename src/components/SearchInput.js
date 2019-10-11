import React from 'react';
import theme from '../constants/theme';
import { View, StyleSheet, Platform } from 'react-native';
import { 
  Input,
  Item,
  Icon,
  Form,
  Text,
  Button,
} from 'native-base';

const SearchInput = props => {
  const { navigation } = props;

  return (
    <View >
      <Button light
        onPress={() => navigation.push('Search')}>
        {/* <Icon name='arrow-back' /> */}
        <Icon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
        <Text style={{alignSelf: 'flex-start'}}>Search</Text>
      </Button>
      {/* <Form> */}
        {/* <Item regular style={styles.search}>
          <Icon active name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
          <Input 
            // disabled
            onFocus={() => console.log('searching!')}
            placeholder='Search' 
          />
        </Item> */}
      {/* </Form> */}
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    borderRadius: theme.borderRadiusMedium,
    height: 40,
    backgroundColor: theme.secondaryBackgroundColor,
    borderColor: 'transparent'
  },
});

export default SearchInput;
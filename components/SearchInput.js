import React from 'react';
import theme from '../constants/theme';
import { View, StyleSheet, Platform } from 'react-native';
import { 
  Input,
  Item,
  Icon,
  Form
} from 'native-base';

const SearchInput = props => {

  return (
    <View>
      <Form>
        <Item regular style={styles.search}>
          <Icon active name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
          <Input placeholder='Search' />
        </Item>
      </Form>
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
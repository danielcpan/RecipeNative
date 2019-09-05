import React from 'react';
import theme from '../constants/Styles';
import { View, StyleSheet } from 'react-native';
import { 
  Input,
  Item,
  Icon,
  Form
} from 'native-base';

const SearchInput = props => {

  return (
    <View style={styles.search}>
      <Form>
        <Item regular style={styles.searchItem}>
          <Icon active name='search' />
          <Input placeholder='Search' />
        </Item>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    paddingLeft: theme.spacingLg,
    paddingRight: theme.spacingLg,
    paddingTop: theme.spacingSm,
    paddingBottom: theme.spacingSm,
  },
  searchItem: {
    borderRadius: 10,
    height: 40,
    backgroundColor: theme.secondaryBackgroundColor,
    borderColor: 'transparent'
  },
});

export default SearchInput;
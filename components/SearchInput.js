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
    <View>
      <Form>
        <Item regular style={styles.search}>
          <Icon active name='search' />
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
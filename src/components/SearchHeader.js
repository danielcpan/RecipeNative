import React, { useState } from 'react';
import { connect } from 'react-redux';
import theme from '../constants/theme'

import {
  StyleSheet,
  View,
} from 'react-native';
import { 
  Icon,
  Input,
  Item,
} from 'native-base';

import * as RecipeActions from '../actions/recipeActions';
import * as GeneralUtils from '../utils/general.utils';
import { getSearchedRecipes } from '../reducers/recipeReducer';
import { Platform } from '@unimodules/core';

const SearchHeader = props => {
  const { navigation, fetchSearchRecipes, loadSearchedRecipes } = props;
  const handleChangeText = (val) => {
    if (!val) return;
    loadSearchedRecipes(val.replace(/\s/g, '-'));
  }

  return (
    <View style={styles.searchContainer}>
      <Icon 
        style={styles.icon}
        name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
        onPress={() => navigation.goBack()}
      />
      <Item regular style={{ borderWidth: 0 }}>
        <Icon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
        <Input 
          isFocused
          style={{ borderWidth: 0 }}
          onChangeText={GeneralUtils.debounce(handleChangeText, 1000)}
          // value={searchData}
          placeholder='Search' 
        />
        <Icon name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'} />
      </Item>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  icon: {
    paddingLeft: 15, 
    color: '#ccc',
  },
});

const mapStateToProps = state => ({
  recipes: getSearchedRecipes(state)
});

const mapDispatchToProps = dispatch => ({
  fetchSearchRecipes: val => dispatch(RecipeActions.fetchSearchRecipes(val)),
  loadSearchedRecipes: val => dispatch(RecipeActions.loadSearchedRecipes(val)),

});

export default connect(null, mapDispatchToProps)(SearchHeader);

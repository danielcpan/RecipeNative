import React from 'react';
import theme from '../constants/Styles';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import { 
  Container, 
  Tab, 
  Tabs, 
  Text,
  Input,
  Item,
  Grid,
  Row, 
  Icon,
  Form,
  H2,
  H3,
  H1
} from 'native-base';
import SearchInput from '../components/SearchInput';

const { width } = Dimensions.get('window');

const SearchScreen = props => {

  return (
    <Container style={{color: '#b4a584'}}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>
      <SearchInput />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subHeaderTitle}>Most Liked Recipes</Text>
        </View>
        <ScrollView 
          // ref={(scrollView) => { this.scrollView = scrollView; }}
          style={styles.cardList}
          showsHorizontalScrollIndicator={false}
          // style={{overflow: 'hidden'}}
          //pagingEnabled={true}
          horizontal= {true}
          // decelerationRate={0}
          // snapToInterval={width - 60}
          // snapToAlignment={"center"}
          // contentInset={{
          //   top: 0,
          //   left: 30,
          //   bottom: 0,
          //   right: 30,
          // }}
          >
          <View style={styles.view} />
          <View style={styles.view2} />
          <View style={styles.view} />
          <View style={styles.view2} />
          <View style={styles.view} />
        </ScrollView>
      </View>
    </Container>
  );
}

SearchScreen.navigationOptions = {
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerRight: (
    <Icon 
      style={{ paddingRight: 15 }} 
      name="ios-settings" 
    />
  )
};

const styles = StyleSheet.create({
  header: {
    ...theme.padding(5, 15, 5, 15),
  },
  headerTitle: {
    fontSize: theme.fontSizeLg,
    fontWeight: theme.fontWeightHeavy,
    color: theme.primaryColor
  },
  subHeaderTitle: {
    fontSize: theme.fontSizeSm,
    fontWeight: theme.fontWeightHeavy,    
  },
  search: {
    ...theme.padding(5, 15, 5, 15),
  },
  searchItem: {
    borderRadius: 10,
    height: 40,
  },
  cardList: {
    paddingLeft: 7.5
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    zIndex: 100
  },
  view: {
    // marginTop: 100,
    backgroundColor: 'blue',
    // width: width - 80,
    width: 175,
    margin: 10,
    // height: 200,
    height: 135,
    borderRadius: 10,
    //paddingHorizontal : 30
  },
  view2: {
    // marginTop: 100,
    backgroundColor: 'red',
    // width: width - 80,
    width: 175,
    margin: 10,
    // height: 200,
    height: 135,
    borderRadius: 10,
    //paddingHorizontal : 30
  },  
});

export default SearchScreen;
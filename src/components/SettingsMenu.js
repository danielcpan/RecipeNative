import React from 'react';
// import { ExpoConfigView } from '@expo/samples';
import { View, Platform, TouchableOpacity } from 'react-native';
import { Icon, Text, Radio } from 'native-base';
import { withNavigation } from 'react-navigation';
import theme from '../constants/theme';


const SettingsMenu = (props) => {
  const { navigation } = props;
  const [settings, setSettings] = React.useState({

  })

  const [selected, setSelected] = React.useState('ratings');


  
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  React.useEffect(() => {
    setIsMenuVisible(false);
  }, [navigation.state.routeName])

  console.log(navigation);

  const getIcon = (type) => {
    if (type === selected) {
      return Platform.OS === 'ios' ? 'ios-checkmark-circle' : 'md-checkmark-circle'
    } else {
      return Platform.OS === 'ios' ? 'ios-checkmark-circle-outline' : 'md-checkmark-circle-outline'
    }
  }

  return (
    <View>
      <TouchableOpacity>
        <Icon 
          onPress={() => setIsMenuVisible(!isMenuVisible)}
          style={{ fontSize: 22, marginRight: 15, transform: [{ rotate: '90deg'}] }} 
          name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'} 
        />
      </TouchableOpacity>
      <View style={{ position: 'absolute', right: 2, top: 25}}>
        {isMenuVisible && (
          <View style={{ backgroundColor: 'white', width: 175, padding: 2.5, borderRadius: 5, borderColor: theme.primaryBackgroundColor, borderWidth: 2}}>
            {(navigation.state.routeName === 'RecipeDetails') && (
              <View>
                <TouchableOpacity style={{padding: 10}}>
                  <Text>
                    Save Recipe
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {(navigation.state.routeName === 'Discover') && (
              <View>
                <TouchableOpacity 
                  style={{padding: 10, display: 'flex', flexDirection: 'row' ,justifyContent: 'space-between', alignItems: 'center'}}
                  onPress={() => setSelected('ratings')}
                >
                  <Text style={{ color: theme.primaryColor, fontWeight: theme.fontWeightHeavy }}>Ratings</Text>
                  <Icon
                    name={getIcon('ratings')} 
                    style={{ color: (selected === 'ratings' ? theme.primaryColor : theme.secondaryColor)}}
                  />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{padding: 10, display: 'flex', flexDirection: 'row' ,justifyContent: 'space-between', alignItems: 'center'}}
                  onPress={() => setSelected('calories')}
                >
                  <Text style={{ color: theme.primaryColor, fontWeight: theme.fontWeightHeavy }}>Calories</Text>
                  <Icon
                    name={getIcon('calories')} 
                    style={{ color: (selected === 'calories' ? theme.primaryColor : theme.secondaryColor)}}
                  />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{padding: 10, display: 'flex', flexDirection: 'row' ,justifyContent: 'space-between', alignItems: 'center'}}
                  onPress={() => setSelected('mins')}
                >
                  <Text style={{ color: theme.primaryColor, fontWeight: theme.fontWeightHeavy }}>Mins</Text>
                  <Icon
                    name={getIcon('mins')} 
                    style={{ color: (selected === 'mins' ? theme.primaryColor : theme.secondaryColor)}}
                  />                  
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  )
}

export default withNavigation(SettingsMenu);
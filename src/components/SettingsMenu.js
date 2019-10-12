import React from 'react';
// import { ExpoConfigView } from '@expo/samples';
import { View, Platform, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'native-base';
import { withNavigation } from 'react-navigation';


const SettingsMenu = (props) => {
  const { navigation } = props;
  const [settings, setSettings] = React.useState({

  })
  
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  React.useEffect(() => {
    setIsMenuVisible(false);
  }, [navigation.state.routeName])

  console.log(navigation);

  return (
    <View>
      <Icon 
        onPress={() => setIsMenuVisible(!isMenuVisible)}
        style={{ fontSize: 22, marginRight: 15, transform: [{ rotate: '90deg'}] }} 
        name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'} 
      />
      <View style={{ position: 'absolute', right: 2, top: 25}}>
        {isMenuVisible && (
          <View style={{ backgroundColor: 'gray', width: 175, padding: 2.5, borderRadius: 5}}>
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
                <TouchableOpacity style={{padding: 10}}>
                  <Text>
                    Ratings
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{padding: 10}}>
                  <Text>
                    Calories
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{padding: 10}}>
                  <Text>
                    Mins
                  </Text>
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
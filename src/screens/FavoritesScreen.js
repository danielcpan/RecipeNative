import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View, Platform } from 'react-native';
import { Item, Icon, Picker } from 'native-base';


export default function FavoritesScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  // return <ExpoConfigView />;
  const [language, setLanguage] = React.useState('Wallet');

  return (
    <Picker
      mode="dropdown"
      iosIcon={<Icon 
        style={{ marginRight: 15, transform: [{ rotate: '90deg'}] }} 
        name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'} 
      />}
      selectedValue={language}
      onValueChange={(val) => setLanguage(val)}
    >
      <Picker.Item label="Wallet" value="key0" />
      <Picker.Item label="ATM Card" value="key1" />
      <Picker.Item label="Debit Card" value="key2" />
      <Picker.Item label="Credit Card" value="key3" />
      <Picker.Item label="Net Banking" value="key4" />
    </Picker>
  )
}

FavoritesScreen.navigationOptions = {
  title: 'Favorites',
};

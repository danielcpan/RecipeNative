import React from 'react';
import theme from '../constants/theme';
import { 
  View, 
} from 'react-native';
import { 
  Text,
} from 'native-base';

const RecipeDetailsInfoSection = props => {
  const { cookTimeMins, servings, calories } = props;

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{alignItems: 'center'}}>
        <Text note>Time</Text>
        <Text style={{ fontWeight: theme.fontWeightHeavy}}>{cookTimeMins} mins</Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text note>Servings</Text>
        <Text style={{ fontWeight: theme.fontWeightHeavy}}>{servings}</Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text note>Nutrition</Text>
        <Text style={{ fontWeight: theme.fontWeightHeavy}}>{calories} Cal</Text>
      </View>
    </View>
  );
}

export default RecipeDetailsInfoSection;
import React from 'react';
import theme from '../constants/theme';
import { 
  View, 
  Image, 
} from 'react-native';
import { 
  Text,
  Body,
  ListItem,
} from 'native-base';


const InstructionsTab = props => {
  const { instructions, isLoading } = props;

  return (
    <View>
      {(isLoading) ? <ActivityIndicator animating style={{paddingTop: 15}} /> : (    
        <>
          {(instructions.map((instruction, idx) => (
            <ListItem key={instruction._id}>
              <Body>
                <View style={{ flexDirection: 'row', ...theme.padding(7.5, 0)}}>
                  <View style={{ backgroundColor: theme.primaryBackgroundColor, height: 30, width: 30, borderRadius: 20}}>
                    <Text>{idx + 1}</Text>
                  </View>

                  <View>
                    <Text>{instruction.stepTitle}</Text>
                  </View>
                </View>

                <View style={{ ...theme.margin(7.5, -15), padding: 0}}>
                  <Image 
                    source={{ uri: instruction.stepImage || null }} 
                    style={{ height: 250, width: '100%', resizeMode: 'cover', zIndex: 10000}}
                  />                
                </View>

                <View style={{...theme.padding(7.5, 0)}}>
                    <Text>{instruction.stepText}</Text>
                </View>
              </Body>
            </ListItem>
          )))}
        </>
      )}
    </View>
  );
}

export default InstructionsTab;
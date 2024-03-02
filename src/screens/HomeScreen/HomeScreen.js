import * as React from 'react';
import {View, Text, Button} from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function HomeScreen({navigation}) {
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
                onPress={() => alert('This is the Home screen')}
                style={{fontSize: 26, fontWeight: 'bold'}}>Home Screen</Text>


                <CustomButton>
                    
                </CustomButton>

            </View>

            
            
    );
}
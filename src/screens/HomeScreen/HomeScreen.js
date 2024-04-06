import * as React from 'react';
import { View, Text, Image } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import MemoryCareLogo from '../../../assets/MemoryCareLogo5.png';


export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* Use imported image directly */}
            <Image
                source={MemoryCareLogo}
                style={{ width: 300, height: 300, marginBottom: 40 }}
            />
                <CustomButton
                 onPress={() => navigation.navigate('MemoryGames')}
                 iconName="puzzle-piece"
                 text="Memory Games"
                />

            <CustomButton onPress={() => navigation.navigate('RelaxationHub')}
                iconName="moon-o"
                 text="Relaxation hub"
                />

            <CustomButton onPress={() => navigation.navigate('PhotoAlbum')}
                iconName="camera"
                 text="Photo Album"
                />
        </View>
    );
}
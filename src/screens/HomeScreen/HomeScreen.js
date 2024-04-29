import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import MemoryCareLogo from '../../../assets/MemoryCareLogo5.png';


export default function HomeScreen({ navigation }) {

    //Array of questions
    const questions = [
        "How is your day going?",
        "What did you have for breakfast today?",
        "Where's your favourite place to go?",
        "What's your favourite film?",
        "What's your favourite book?",
        "What's your favourite drink?"
    ];                             

    const [question, setQuestion] = React.useState('');

    React.useEffect(() => {
        //Randomizes and sets array 
        const randomQuote = questions[Math.floor(Math.random() * questions.length)];
        setQuestion(randomQuote);
    }, []);

    return (
        <View style={styles.container}>
            <Text>Question of the day!</Text>
            <Text style={styles.questionText}>{question}</Text>
            <Image
                source={MemoryCareLogo}
                style={styles.logo}
            />
            <CustomButton
                onPress={() => navigation.navigate('MemoryGames')}
                iconName="puzzle-piece"
                text="Memory Games"
            />
            <CustomButton
                onPress={() => navigation.navigate('RelaxationHub')}
                iconName="moon-o"
                text="Relaxation hub"
            />
            <CustomButton
                onPress={() => navigation.navigate('PhotoAlbum')}
                iconName="camera"
                text="Photo Album"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 40
    },
    questionText: {
        fontSize: 18,
        fontStyle: 'italic',
        marginBottom: 20, 
        textAlign: 'center', 
        paddingHorizontal: 30,
        fontWeight: 'bold',
    }
});


import {StyleSheet, Text, View, TextInput, ScrollView, FlatList, SafeAreaView} from 'react-native';
import SignInScreen from './src/screens/SignInScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
    <SignInScreen/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
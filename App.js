import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import CityDropDown from './components/Dropdown';

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <CityDropDown />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DropDownPicker
          items={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ]}
          defaultValue={selectedValue}
          placeholder="Choose a city"
          containerStyle={{ height: 40 }}
          onChangeItem={(item) => setSelectedValue(item.value)}
        />
      </View>
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

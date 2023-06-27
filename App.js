import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Bangalore', value: 'bangalore' },
    { label: 'Chennai', value: 'chennai' }
    { label: 'Mumbai', value: 'Mumbai' }
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <DropDownPicker
          items={items}
          setItems={setItems}
          placeholder="Choose a city"
          containerStyle={{ height: 40 }}
          onChangeItem={(item) => setValue(item.value)}
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
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

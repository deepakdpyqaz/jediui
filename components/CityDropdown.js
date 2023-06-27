import { View } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CityDropDown() {
    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Bangalore', value: 'bangalore' },
        { label: 'Chennai', value: 'chennai' },
        { label: 'Mumbai', value: 'mumbai' }
    ]);

    return (
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
    );
}
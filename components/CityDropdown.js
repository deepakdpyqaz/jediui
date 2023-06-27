import { View } from 'react-native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { AppContext } from '../appContext';

class CityDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            items: [
                { label: 'Bangalore', value: 'bangalore' },
                { label: 'Chennai', value: 'chennai' },
                { label: 'Mumbai', value: 'mumbai' }
            ],
            value: null
        }

        this.setValue = this.setValue.bind(this);
    }

    setOpen(open) {
        this.setState({ open });
    }

    setValue(callback) {
        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems(callback) {
        this.setState(state => ({
            items: callback(state.items)
        }))
    }

    render() {
        const { open, items, value } = this.state;

        return (
            <AppContext.Consumer>
                {({ city, changeCity }) => (
                    <View>
                        <DropDownPicker
                            placeholder="Choose a city"
                            items={items}
                            value={value}
                            open={open}
                            setValue={this.setValue}
                            setOpen={this.setOpen}
                            setItems={this.setItems}
                            onSele={(item) => changeCity(item.value)}
                            containerStyle={{ height: 40 }}
                        />
                    </View >
                )}
            </AppContext.Consumer>

        );
    }
}


export default CityDropDown
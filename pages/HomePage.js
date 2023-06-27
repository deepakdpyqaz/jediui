import React from "react";
import CityDropDown from "../components/CityDropdown";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { AppContext } from "../appContext";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <CityDropDown changeCity={this.props.changeCity} />
                <Text>Current City: {this.context.city}</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Gyms")}>
                    <Text>Continue</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 20
    },
    button: {
        backgroundColor: "#DDDDDD",
        padding: 10
    }
})

HomePage.contextType = AppContext

export default HomePage;
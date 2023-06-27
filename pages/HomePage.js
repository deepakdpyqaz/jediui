import React from "react";
import CityDropDown from "../components/CityDropdown";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

class HomePage extends React.Component {

    render() {
        return (
            <View>
                <Text>Homepage</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Gyms")}>
                    <Text>Navigate to browse</Text>
                </TouchableOpacity>
                <CityDropDown />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: "#DDDDDD",
        padding: 10
    }
})

export default HomePage;
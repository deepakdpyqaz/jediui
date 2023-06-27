import React from "react";
import CityDropDown from "../components/CityDropdown";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { AppContext } from "../appContext";
import { SafeAreaView } from "react-native-safe-area-context";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <CityDropDown changeCity={this.props.changeCity} />
          <Text>Current City: {this.context.city}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Gyms")}
          >
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

HomePage.contextType = AppContext;

export default HomePage;

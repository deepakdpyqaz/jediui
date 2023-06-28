import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from 'react-native-toast-message';
import GymBrowsePage from "./pages/GymBrowsePage";
import HomePage from "./pages/HomePage";

const Stack = createStackNavigator();

// Context
import { cities, AppContext } from "./appContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeCity = (city) => {
      this.setState({
        city: city,
      });
    };
    this.state = {
      city: cities.bangalore,
      changeCity: this.changeCity,
    };
  }

  render() {
    return (
      <NavigationContainer>
        <AppContext.Provider value={this.state}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomePage}
              changeCity={this.changeCity}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Gyms"
              component={GymBrowsePage}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </AppContext.Provider>
        <Toast />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;

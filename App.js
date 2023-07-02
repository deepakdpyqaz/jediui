import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from 'react-native-toast-message';
import GymBrowsePage from "./pages/GymBrowsePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
const Stack = createStackNavigator();

// Context
import { cities, AppContext, user } from "./appContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeCity = (city) => {
      this.setState({
        city: city,
      });
    };
    this.changeUser = (user) => {
      this.setState({
        user: user,
      })
    }
    this.state = {
      city: cities.bangalore,
      changeCity: this.changeCity,
      user: null,
      changeUser: this.changeUser,
    };
  }

  render() {
    return (
      <NavigationContainer>
        <AppContext.Provider value={this.state}>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginPage}
              changeCity={this.changeCity}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationPage}
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

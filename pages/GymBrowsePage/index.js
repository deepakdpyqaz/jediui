import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ViewGym from "./ViewGym";
import MyBookings from "./MyBookings";

const Tab = createBottomTabNavigator();

class GymBrowsePage extends React.Component {
  render() {
    return (
      <Tab.Navigator sceneContainerStyle={{backgroundColor:"#fff"}}> 
        <Tab.Screen
          name="Choose your favourite gym!"
          component={ViewGym}
          options={{
            tabBarLabel: "Gyms",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="kabaddi"
                color={color}
                size={size}
              />
            ),
            tabBarActiveTintColor:'#7353BA',
            headerShown:false,
          }}
        />
        <Tab.Screen
          name="Slot"
          component={ViewGym}

          options={{
            tabBarLabel: "Book Slot",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="kabaddi"
                color={color}
                size={size}
              />
            ),
            tabBarActiveTintColor:'#7353BA'
          }}
        />
        <Tab.Screen
          name="My Bookings"
          component={MyBookings}
          options={{
            tabBarLabel: "My Bookings",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-heart"
                color={color}
                size={size}
              />
            ),
            tabBarActiveTintColor:'#7353BA'
          }}
        />
        <Tab.Screen
          name="My Profile"
          component={MyBookings}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
            tabBarActiveTintColor:'#7353BA'
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default GymBrowsePage;

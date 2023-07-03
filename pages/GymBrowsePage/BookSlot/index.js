import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import ViewGym from "./ViewGym";
import ViewSlot from "./ViewSlot";
import { AppContext } from "../../../appContext";
const Stack = createStackNavigator();
class BookSlot extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
                <Stack.Navigator screenOptions={{sceneContainerStyle:{backgroundColor:"#fff"},unmountOnBlur:true}}>
                    <Stack.Screen
                        name="Available Gyms"
                        component={ViewGym}
                        options={{unmountOnBlur:true}}
                    />

                    <Stack.Screen
                        name="Select slot"
                        component={ViewSlot}
                        options={{unmountOnBlur:true}}
                    />
                </Stack.Navigator>
        )
    }
}
BookSlot.contextType = AppContext;
export default BookSlot;
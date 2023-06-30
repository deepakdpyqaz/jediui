import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Text } from "react-native";

class Button extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.button}><Text style={styles.buttonText}>{this.props.children}</Text></TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:"#FFB606",
        color: "#fff",
        width: "50%",
        borderRadius: 20
    },
    buttonText:{
        fontWeight: 300,
        fontSize: 22,
        textAlign: "center",
        padding: 4
    }
})
export default Button;
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

class Input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value){
        this.setState({"value":value});
        this.props.onChangeText(value);
    }
    render(){
        return (
            <TextInput 
                secureTextEntry={this.props.isSecured} 
                style={styles.textinput} 
                onChangeText={this.handleChange} 
                placeholderTextColor="#FFF8" 
                placeholder={this.props.placeholder}
                multiline={this.props.multiline}
                numberOfLines={this.props.multiline?2:1}
            >
                    
            </TextInput>
        )
    }
}
const styles = StyleSheet.create({
    textinput:{
        color: "#FFF",
        fontSize: 18,
        borderLeftColor: "#FFF",
        borderBottomColor: "#FFF",
        padding: 2,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        width: "100%"
    }
})
export default Input;
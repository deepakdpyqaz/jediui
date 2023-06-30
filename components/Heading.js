import React from "react";
import { Text,StyleSheet } from "react-native";
class Heading extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Text style={{...styles.heading,...this.props.style}}>
                {this.props.children}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    heading:{
        color:"#FFF",
        fontSize: 32,
        marginVertical: 4
    }
})
export default Heading;
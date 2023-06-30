import React from "react";
import { ImageBackground } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { AppContext } from "../appContext";
import { Text } from "react-native";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Button from "../components/Button";
import {Picker} from "react-native";

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            "name":"",
            "username":"",
            "password":"",
            "address":"",
            "phone":"",
            "gender":"",

        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground resizeMode="cover" source={require("../assets/background_home.png")} style={styles.image}>
                    <View style={styles.paper}>
                        <Heading style={styles.heading}>Registration</Heading>
                        <Input placeholder="Username" onChangeText={(val) => { this.setState({ "username": val }) }} />
                        <Input placeholder="Password" isSecured={true} onChangeText={(val) => { this.setState({ "password": val }) }} />
                        <Input placeholder="Name" onChangeText={(val) => { this.setState({ "name": val }) }} />
                        <Input placeholder="Address" onChangeText={(val) => { this.setState({ "address": val }) }} multiline={true}/>
                        <Input placeholder="Phone" onChangeText={(val) => { this.setState({ "phone": val }) }} />
                        <Picker
                            selectedValue={this.state.gender}
                            onValueChange={(itemValue, itemIndex) => this.setState({"gender":itemValue})}
                        >
                            <Picker.Item label="Male" value="M"/>
                            <Picker.Item label="Female" value="F"/>
                        </Picker>
                        <Button onPress={() => this.handleSubmit()}>Registration</Button>
                        <Text style={styles.link} onPress={() => { this.props.navigation.navigate("Registration") }}>Create new account &gt;</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    button: {
        backgroundColor: "#DDDDDD",
        padding: 10,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    paper: {
        width: 350,
        height: 450,
        backgroundColor: "#0008",
        alignSelf: "center",
        padding: 10,
        justifyContent: "space-around"
    },
    heading: {
        textAlign: "left",
        borderBottomColor: "#FFB606",
        borderBottomWidth: 3,
        marginBottom: 30
    },
    link: {
        color: "#FFB606"
    }
});

RegistrationPage.contextType = AppContext;

export default RegistrationPage;

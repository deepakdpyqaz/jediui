import React from "react";
import { ImageBackground } from "react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { AppContext } from "../appContext";
import { Text } from "react-native";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Button from "../components/Button";
import { RadioButton } from 'react-native-paper';
import { Toast } from "react-native-toast-message/lib/src/Toast";

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": "",
            "username": "",
            "password": "",
            "address": "",
            "phone": "",
            "gender": "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit() {
        try {
            const res = await fetch("http://10.0.2.2:8080/customer/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(this.state) })
            if (res.status === 201) {
                const jsonRes = await res.json();
                Toast.show({
                    type: "success",
                    text1: "Registration Successfull",
                    text2: "Please login to continue",
                    autoHide: true,
                    visibilityTime: 5000
                })
                this.props.navigation.navigate("Login");
            }
            else {
                Toast.show({
                    type: "error",
                    text1: "Registration Failed",
                    text2: res.message || "Please try again",
                    autoHide: true,
                    visibilityTime: 5000
                })
            }
        }
        catch (err) {
            console.log(err);
            Toast.show({
                type: "error",
                text1: "Registration Failed",
                text2: err.message|| "Please try again",
                autoHide: true,
                visibilityTime: 5000
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground resizeMode="cover" source={require("../assets/background_home.png")} style={styles.image}>
                    <View style={styles.paper}>
                        <Input placeholder="Username" onChangeText={(val) => { this.setState({ "username": val }) }} />
                        <Input placeholder="Password" isSecured={true} onChangeText={(val) => { this.setState({ "password": val }) }} />
                        <Input placeholder="Name" onChangeText={(val) => { this.setState({ "name": val }) }} />
                        <Input placeholder="Address" onChangeText={(val) => { this.setState({ "address": val }) }} multiline={true} />
                        <Input placeholder="Phone" onChangeText={(val) => { this.setState({ "phone": val }) }} />
                        <View style={styles.row}>
                            <Text style={{ color: "#fff", alignSelf: "center", fontSize: 20 }}>
                                Gender
                            </Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ "color": "#fff", fontSize: 20 }}>
                                    Male:
                                </Text>
                                <RadioButton
                                    value="M"
                                    status={this.state.gender === 'M' ? 'checked' : 'unchecked'}
                                    onPress={() => this.setState({ "gender": "M" })}
                                    color="#fff"
                                />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ "color": "#fff", fontSize: 20 }}>Female: </Text>
                                <RadioButton
                                    value="second"
                                    status={this.state.gender === 'F' ? 'checked' : 'unchecked'}
                                    onPress={() => this.setState({ "gender": "F" })}
                                    color="#fff"
                                />
                            </View>
                        </View>
                        <Button style={styles.button} onPress={() => this.handleSubmit()}>Registration</Button>
                        <Text style={styles.link} onPress={() => { this.props.navigation.navigate("Login") }}>Already have a account &gt;</Text>
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
        marginVertical: 50
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
        justifyContent: "space-around",
        alignItems: "center"
    },
    heading: {
        textAlign: "left",
        borderBottomColor: "#FFF",
        borderBottomWidth: 3,
        marginBottom: 30
    },
    link: {
        color: "#FFF"
    },
    dropdown: {
        backgroundColor: "#FFF",
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        fontSize: 20
    }
});

RegistrationPage.contextType = AppContext;

export default RegistrationPage;

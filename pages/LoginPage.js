import React from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ImageBackground } from "react-native";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Button from "../components/Button";
import { StyleSheet } from "react-native";
import { AppContext } from "../appContext";
import { View } from "react-native";
import { Text } from "react-native";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      password: ""
    }
  }
  async handleSubmit() {
    const res = await fetch("http://10.0.2.2:8080/user/login", 
    { 
      method: "POST", 
      mode: "cors", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(this.state) 
    });
    if(res.status==200){
      const jsonRes = await res.json();
      Toast.show(
        {
          type:"success",
          text1:`Welcome!! ${jsonRes.name}`,
          text2: "You have been succesfully logged in",
          position:"top",
          autoHide:true,
          visibilityTime: 5000
        }
      )
      this.props.navigation.navigate("Gyms");
    }
    else{
        const jsonRes = await res.json();
        Toast.show(
          {
            type:"error",
            text1:`${jsonRes.error}`,
            position:"top",
            autoHide:true,
            visibilityTime: 5000
          }
        )
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground resizeMode="cover" source={require("../assets/background.jpeg")} style={styles.image}>
          <View style={styles.paper}>
            <Heading style={styles.heading}>Login</Heading>
            <Input placeholder="Username" onChangeText={(val) => { this.setState({ "username": val }) }} />
            <Input placeholder="Password" isSecured={true} onChangeText={(val) => { this.setState({ "password": val }) }} />
            <Button onPress={() => this.handleSubmit()}>Login</Button>
            <Text style={styles.link} onPress={()=>{this.props.navigation.navigate("Registration")}}>Create new account &gt;</Text>
          </View>
        </ImageBackground>
      </View>
    );
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
    height: 300,
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
  link:{
    color: "#FFB606"
  }
});

LoginPage.contextType = AppContext;

export default LoginPage;

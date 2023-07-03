import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import Toast from 'react-native-toast-message';
import { AppContext } from "../../../appContext";

class ViewGym extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            gyms:[]
        }
    }

    bookGym = (gym) => {
        this.props.navigation.navigate("Select slot",{gym})
    }

    async getAllGyms(){
        const res = await fetch("http://10.0.2.2:8080/gym/all");
        const gyms = await res.json();
        this.setState({gyms:gyms});
    }

    showToast = (gymString) => {
        Toast.show({
            type: 'success',
            text1: gymString,
            text2: 'Gym booked 🏋️'
        });
    }


    ListItem = ({item,index,separator}) => {
        return (
            <TouchableOpacity key={item.gymId} onPress={()=>this.bookGym(item)}>
                <View style={styles.listItem}>
                    <Text style={styles.gymName}>{item.gymName}</Text>
                    <Text style={styles.address}>{item.address}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount(){
        if(!(this.context.user && this.context.user.username)){
            this.props.navigation.replace("Login")
        }
        try{
            this.getAllGyms();
        }
        catch(err){
            Toast.show({
                type:"error",
                text1: "Error in getting list of gyms",
                text2: "Please try again after sometime",
                autoHide: true,
                visibilityTime: 10000
            })
        }
    }


    render() {
        return (
            <SafeAreaView style={{backgroundColor:"#fff"}}>
                {this.state.gyms?
                    <FlatList
                        data={this.state.gyms}
                        renderItem={this.ListItem}
                        keyExtractor={gym=>gym.gymId.toString()}
                    />
                :null}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
        elevation: 4, // Adjust the value as needed for the desired shadow effect
        backgroundColor: '#7353BA',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor:"grey",
        margin: 10,
        color:"#fff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    text: {
        fontSize: 16,
        margin: 10,
    },
    gymName:{
        fontSize: 20,
        color:"#fff",
        marginBottom: 10,
        fontWeight: "heavy",
    },
    address:{
        fontSize: 14,
        color:"#fff"
    }
})

ViewGym.contextType = AppContext

export default ViewGym;

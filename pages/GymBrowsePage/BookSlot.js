import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Toast from 'react-native-toast-message';
import { AppContext } from "../../appContext";

class BookSlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    bookGym = (name, city) => {
        console.log("bookGym", name, city);
        const startTime = Date.now();
        const endTime = Date.now();

        const dataToSend = {
            gym: name,
            city,
            start_time: startTime,
            end_time: endTime,
        }

        fetch("http://localhost:3000/api/book-slot", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then(res => res.json)
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }

    componentDidMount() {
        // get request

        console.log("BookSlot mounted");

        fetch(`http://localhost:3000/api/cities/${this.context.city.toLowerCase()}/gyms`)
            .then((res) => {
                return res.json()
            })
            .then(res => this.setState({ data: res }))
            .catch(err => console.error(err));
    }

    showToast = (gymString) => {
        Toast.show({
            type: 'success',
            text1: gymString,
            text2: 'Gym booked 🏋️'
        });
    }

    renderList = (el) => {
        return (
            <TouchableOpacity key={el.slug} onPress={() => this.bookGym(el.name, el.city)}>
                <View style={styles.container}>
                    <Text style={styles.text}>{el.name}</Text>
                    <Text style={styles.text}>{el.city}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <View>
                {
                    this.state.data && this.state.data.map((el) => this.renderList(el))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        margin: 10,
        borderRadius: 3,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "grey",
    },
    text: {
        fontSize: 16,
        margin: 10,
    }
})

BookSlot.contextType = AppContext

export default BookSlot;

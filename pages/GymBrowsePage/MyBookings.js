import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import Toast from 'react-native-toast-message';
import { AppContext } from "../../appContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class MyBookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            times: []
        }
    }
    formatDate = (date) => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const day = daysOfWeek[date.getDay()];

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const formattedDate = `${day} ${this.formatDigit(hours)}:${this.formatDigit(minutes)}:${this.formatDigit(seconds)}`;
        return formattedDate;
    };

    formatDigit = (digit) => {
        return digit.toString().padStart(2, '0');
    };
    async getTime(slotids) {
        const res = await fetch(`http://10.0.2.2:8080/slot/get-slot/${slotids}`);
        const slots = await res.json();
        return slots.slot_start_time;
    }
    async getBookings() {
        try {
            const bookings = await fetch(`http://10.0.2.2:8080/booking_slot/get_all_bookings/${this.context.user.username}`);
            const bookingsJson = await bookings.json();
            let data = bookingsJson.map((elem) => {
                return { ...elem, day: this.formatDate(new Date(elem.date)) }
            })
            let slot_times = [];
            // console.log(data);
            for (let i = 0; i < data.length; i++) {
                slot_times.push(await this.getTime(data[i].slot_id));
            }
            // console.log(slot_times);
            // console.log(data);
            this.setState({ bookings: data, times: slot_times });
        }
        catch (err) {
            Toast.show({
                type: "error",
                text1: "Error in getting list of bookings",
                text2: "Please try again after sometime",
                autoHide: true,
                visibilityTime: 10000
            })
        }
    }
    async cancelBooking(booking_id) {
        console.log(booking_id);
        const res = await fetch(`http://10.0.2.2:8080/booking_slot/cancel-slot/${booking_id}`, { method: "POST" });
        const resJson = await res.json();
        if (res.status == 200) {
            Toast.show({
                type: "success",
                text1: "Booking cancelled",
                autoHide: true,
                visibilityTime: 2000
            })
        }
        this.getBookings();
    }
    ListItem = ({ item, index, separator }) => {
        return (
            <TouchableOpacity key={item.booking_id} onPress={() => this.cancelBooking(item.booking_id)}>
                <View style={styles.listItem}>
                    <Text style={styles.gymName}>Booking: {item.booking_id}</Text>
                    <Text style={styles.address}>{this.state.times[index]}</Text>
                        <MaterialCommunityIcons
                            name="delete"
                            color="red"
                            size={2}
                        />
                </View>
            </TouchableOpacity>
        )
    }
    componentDidMount() {
        if (!(this.context.user && this.context.user.username)) {
            this.props.navigation.replace("Login")
        }
        try {
            this.getBookings();
        }
        catch (err) {
            console.log(err);
            Toast.show({
                type: "error",
                text1: "Error in getting list of gyms",
                text2: "Please try again after sometime",
                autoHide: true,
                visibilityTime: 10000
            })
        }
    }
    render(props) {
        return (
            <SafeAreaView style={{ backgroundColor: "#fff" }}>
                {this.state.bookings ?
                    <FlatList
                        data={this.state.bookings}
                        renderItem={this.ListItem}
                        keyExtractor={booking => booking.booking_id.toString()}
                    />
                    : null}
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
        borderColor: "grey",
        margin: 10,
        color: "#fff",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    text: {
        fontSize: 16,
        margin: 10,
    },
    gymName: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 10,
        fontWeight: "heavy",
    },
    address: {
        fontSize: 14,
        color: "#fff"
    }
})
MyBookings.contextType = AppContext;

export default MyBookings;

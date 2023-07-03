import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, ScrollView, Modal, Pressable } from "react-native";
import Toast from 'react-native-toast-message';
import { AppContext } from "../../../appContext";

class ViewSlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slots: [],
            modalVisible: false,
            modalText: "Please confirm the slot booking!",
            selectedSlot: -1,
        }
    }
    async getSlots(gymId) {
        try {
            const res = await fetch(`http://10.0.2.2:8080/slot/get-slots-of-gym/${gymId}`,);
            if (res.status == 200) {
                const jsonRes = await res.json();
                let gymdata = jsonRes.map((elem) => {
                    return { ...elem, day: new Date(elem.day) }
                })
                this.setState({
                    slots: gymdata,

                })
            }
            else {
                Toast.show({
                    type: "error",
                    text1: res.message || "Some error occured",
                    text2: "Please try after some time",
                    autoHide: true,
                    visibilityTime: 5000
                })
            }
        }
        catch (err) {
            Toast.show({
                type: "error",
                text1: err.message || "Some error occured",
                text2: "Please try after some time",
                autoHide: true,
                visibilityTime: 5000
            })
        }
    }
    async checkAvailablity(slot_id) {
        try {
            const res = await fetch(`http://10.0.2.2:8080/booking_slot/clashing-slot/${this.context.user.username}/${slot_id}`,{method:"POST"});
            if (res.status == 200) {
                const jsonRes = await res.json();
                console.log(jsonRes);
                if (jsonRes && jsonRes.clashing == "true") {
                    this.setState({
                        modalText: "You already have a booking on same time. Would you like to book this slot and cancel previous"
                    })
                }
                this.setState({ modalVisible: true, selectedSlot: slot_id })
            }
            else {
                throw Error(res.message);
            }
        }
        catch (err) {
            Toast.show(
                {
                    type: "error",
                    text1: err.message || "Error in booking slot",
                    autoHide: true,
                    visibilityTime: 5000
                }
            )
            console.log(err);
        }
    }
    async bookSlot(slot_id) {
        this.setState({ modalVisible: false });
        if (slot_id == -1) return;
        try {
            const res = await fetch(`http://10.0.2.2:8080/booking_slot/book-slot/${this.context.user.username}/${slot_id}`, { method: "POST" });
            if (res.status == 200) {
                const jsonRes = await res.json();
                console.log(jsonRes);
                if (jsonRes) {
                    Toast.show({
                        type: "success",
                        text1: "Your booking is successful"
                    })
                }
            }
            else {
                Toast.show({
                    type: "error",
                    text1: "Error in booking"
                })
            }
        } catch (err) {
            Toast.show(
                {
                    type: "error",
                    text1: err.message || "Error in booking slot",
                    autoHide: true,
                    visibilityTime: 5000
                }
            )
        }
        finally {
            this.setState({
                selectedSlot: -1
            })
            this.getSlots(this.props.route.params.gym.gymId);
        }

    }
    createDateTime(date, timeString) {
        const [hours, minutes, seconds] = timeString.split(":");
        const currentDate = new Date(date);
        currentDate.setHours(hours);
        currentDate.setMinutes(minutes);
        currentDate.setSeconds(seconds);
        return this.formatDate(currentDate);
    }
    formatDate = (date) => {
        const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

        const day = date.getDay();
        const dayName = daysOfWeek[day];

        const dayOfMonth = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedDate = `${dayName} ${dayOfMonth}/${month}/${year} ${this.formatHour(hours)}:${this.formatMinute(minutes)} ${ampm}`;
        return formattedDate;
    };

    formatHour = (hours) => {
        const twelveHourFormat = hours % 12 || 12;
        return twelveHourFormat.toString().padStart(2, '0');
    };

    formatMinute = (minutes) => {
        return minutes.toString().padStart(2, '0');
    };
    ListItem = ({ item, index, separator }) => {
        return (
            <TouchableOpacity key={item.slotId} onPress={() => this.checkAvailablity(item.slotId)}>
                <View style={styles.listItem}>
                    <View>

                        <Text style={styles.slot_time}>{this.createDateTime(item.day, item.slot_start_time)}</Text>
                        <Text style={styles.slot_time}>{this.createDateTime(item.day, item.slot_end_time)}</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>

                        <Text style={styles.available_slots}>Available Slots: {item.availSeats}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        if (this.props.route.params && this.props.route.params.gym && this.props.route.params.gym.gymId) {
            this.getSlots(this.props.route.params.gym.gymId);
        }
        else {
            Toast.show({
                type: "error",
                text1: "An unexpected error occured",
                text2: "Please try again after sometime",
                autoHide: true,
                visibilityTime: 5000
            })
            this.props.navigation.navigate("Gyms");
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setState({
                                modalVisible: !modalVisible
                            })
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>{this.state.modalText}</Text>
                                <View style={{ justifyContent: "space-around", alignItems: "center", flexDirection: "row" }}>
                                    <Pressable
                                        style={[styles.button, styles.buttonOpen]}
                                        onPress={() => this.bookSlot(this.state.selectedSlot)}>
                                        <Text style={styles.textStyle}>Ok</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <ScrollView>
                    <View style={styles.gymInfo}>

                    </View>
                    <ScrollView style={styles.container} horizontal={true}>
                        {this.state.slots ?
                            <FlatList
                                data={this.state.slots}
                                renderItem={this.ListItem}
                                keyExtractor={gym => gym.slotId.toString()}
                            />
                            : null}
                    </ScrollView>
                </ScrollView>

            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#fff"
    },
    gymInfo: {

    },
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
        flex: 1,
        flexDirection: "row"
    },
    slot_time: {
        color: "#fff",
        margin: 10
    },
    available_slots: {
        color: "#fff",
        margin: 10,
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#B589D6' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#B589D6' },
    row: { height: 28 },
    text: { textAlign: 'center' },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 2,
        padding: 10,
        elevation: 2,
        margin: 20
    },
    buttonOpen: {
        backgroundColor: '#7353BA',
    },
    buttonClose: {
        backgroundColor: '#000a',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})
ViewSlot.contextType = AppContext;
export default ViewSlot;
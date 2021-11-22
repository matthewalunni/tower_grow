import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Switch } from "react-native-elements/dist/switch/switch";
import DateTimePicker from '@react-native-community/datetimepicker';
import PubNub from 'pubnub';
import { PubNubProvider } from "pubnub-react";

const pubnub = new PubNub({
    publishKey: 'pub-c-8bca52f9-3ed6-4c9e-a6f5-0dd08fefa83e',
    subscribeKey: 'sub-c-ef4d649a-440f-11ec-8ee6-ce954cd2c970'
});

const channel = 'MattsChannel'


class ControlScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ledIsEnabled: false,
            pumpIsEnabled: false,
            scheduleIsEnabled: false,
            currentDate: new Date(),
        };
        this.toggleSwitchLED = this.toggleSwitchLED.bind(this);
        this.toggleSwitchPump = this.toggleSwitchPump.bind(this);
        this.toggleSwitchSchedule = this.toggleSwitchSchedule.bind(this);
        this.LEDOnTimeChange = this.LEDOnTimeChange.bind(this);
        this.LEDOffTimeChange = this.LEDOffTimeChange.bind(this);
        this.renderScheduleElement = this.renderScheduleElement.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
    }

    sendMessage = (message) => {
        pubnub.publish({
            message: message,
            channel: channel,
        });
    }

    receiveMessage = (event) => {
        if (event.message) {
            console.log(event.message);
        }
    }

    toggleSwitchLED = () => {
        let message = "";
        //if the switch is off, turn the lights on
        if (!this.state.ledIsEnabled) {
            message = "LED is off, turning on";
            console.log(message);
        }
        //if the switch is on, turn the lights off
        else {
            message = "LED is on, turning off";
            console.log(message);
        }
        this.sendMessage(message);
        this.setState({
            ledIsEnabled: !this.state.ledIsEnabled,
        });
    }

    toggleSwitchPump = () => {
        this.setState({
            pumpIsEnabled: !this.state.pumpIsEnabled,
        });
    }

    toggleSwitchSchedule = () => {
        this.setState({
            scheduleIsEnabled: !this.state.scheduleIsEnabled,
        });
    }

    LEDOnTimeChange = (event, selectedDate) => {
        console.log("changing time")
    }

    LEDOffTimeChange = (event, selectedDate) => {
        console.log("changing time")
    }

    renderScheduleElement = () => {
        if (this.state.scheduleIsEnabled) {
            return (
                <>
                    <View style={styles.listItem}>
                        <Text style={styles.listItemLeft}>LED On Time</Text>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode={'time'}
                            is24Hour={false}
                            display="compact"
                            onChange={this.LEDOnTimeChange}
                            style={styles.dateTimePicker} />
                    </View><View style={styles.listItem}>
                        <Text style={styles.listItemLeft}>LED Off Time</Text>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode={'time'}
                            is24Hour={false}
                            display="compact"
                            onChange={this.LEDOffTimeChange}
                            style={styles.dateTimePicker} />
                    </View>
                </>
            )
        }
    }

    render() {
            return (
                <PubNubProvider client={pubnub}>
                    <SafeAreaView>
                        <View>
                            <Text
                                style={styles.control_hello}>Hello,
                                Let’s Control Your Garden</Text>
                            <View style={styles.control_list}>
                                <View style={styles.listItem}>
                                    <Text style={styles.listItemLeft}>LED Lights</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#A4AC86" }}
                                        thumbColor={this.state.ledIsEnabled ? "#333D29" : "#f4f3f4"}
                                        ios_backgroundColor="#333D29"
                                        onValueChange={this.toggleSwitchLED}
                                        value={this.state.ledIsEnabled}
                                        style={styles.listItemRight}
                                    />
                                </View>
                                <View style={styles.listItem}>
                                    <Text style={styles.listItemLeft}>Pump</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#A4AC86" }}
                                        thumbColor={this.state.pumpIsEnabled ? "#333D29" : "#f4f3f4"}
                                        ios_backgroundColor="#333D29"
                                        onValueChange={this.toggleSwitchPump}
                                        value={this.state.pumpIsEnabled}
                                    />
                                </View>
                                <View style={styles.listItem}>
                                    <Text style={styles.listItemLeft}>LED Schedule</Text>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#A4AC86" }}
                                        thumbColor={this.state.scheduleIsEnabled ? "#333D29" : "#f4f3f4"}
                                        ios_backgroundColor="#333D29"
                                        onValueChange={this.toggleSwitchSchedule}
                                        value={this.state.scheduleIsEnabled}
                                    />
                                </View>
                                {this.renderScheduleElement()}
                            </View>
                        </View>
                    </SafeAreaView>
                </PubNubProvider>
            );
        }
    }

const styles = StyleSheet.create({
    control_hello: {
        opacity: 1,
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0)",
        color: "#333D29",
        fontSize: 34,
        fontWeight: "400",
        fontStyle: "normal",
        fontFamily: "Apple Symbols",
        textAlign: "left",
        width: 312,
        height: 74,
        left: 39,
        top: 88,
        // borderColor: "#FF0000", //red
        // borderWidth: 1,
    },
    control_list: {
        flex: 1,
        opacity: 1,
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0)",
        color: "#333D29",
        fontSize: 24,
        fontWeight: "400",
        fontStyle: "normal",
        fontFamily: "Apple Symbols",
        textAlign: "left",
        left: 39,
        top: 276,
        // borderColor: "#FF0000", //red
        // borderWidth: 1,
        width: 312,
    },
    listItem: {
        flex: 1,
        flexDirection: "row",
        // borderColor: "#FF0000", //red
        // borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlignVertical: 'center',
        padding: 10,
    },
    listItemRight: {
        flexDirection: "row",
        alignSelf: "flex-end",
    },
    listItemLeft: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        textAlignVertical: 'center',
    },
    dateTimePicker: {
        flex: 1,
        width: 312,
        //backgroundColor: 'white',
        // borderColor: "#FF0000", //red
        // borderWidth: 1,
    }
});
export default ControlScreen;
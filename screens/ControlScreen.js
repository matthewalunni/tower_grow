import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import { Switch } from "react-native-elements/dist/switch/switch";

class ControlScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ledIsEnabled: false,
            pumpIsEnabled: false,
            scheduleIsEnabled: false,
        };
        this.toggleSwitchLED = this.toggleSwitchLED.bind(this);
        this.toggleSwitchPump = this.toggleSwitchPump.bind(this);
        this.toggleSwitchSchedule = this.toggleSwitchSchedule.bind(this);
    }

    toggleSwitchLED = () => {
        this.setState({
            ledIsEnabled: !this.state.ledIsEnabled,
        });

        //if the switch is on, turn the lights on
        if (this.state.ledIsEnabled) {
            this.setState({
                setIsEnabled: true
            });
        }   //if the switch is off, turn the lights off
        else {
            this.setState({
                setIsEnabled: false
            });
        }


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

    render() {
        if (this.state.scheduleIsEnabled) {
            return (
                <SafeAreaView>
                    <View>
                        <Text
                            style={styles.control_hello}>Hello,
                            Let’s Control Your Garden</Text>
                        <View style={styles.control_list}>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemLeft}>LED Lights</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={this.state.ledIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={this.toggleSwitchLED}
                                    value={this.state.ledIsEnabled}
                                    style={styles.listItemRight}
                                />
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemLeft}>Pump</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={this.state.pumpIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={this.toggleSwitchPump}
                                    value={this.state.pumpIsEnabled}
                                />
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemLeft}>LED Schedule</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={this.state.scheduleIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={this.toggleSwitchSchedule}
                                    value={this.state.scheduleIsEnabled}
                                />
                            </View>

                            <View style={styles.listItem}>
                                <Text style={styles.listItemLeft}>LED On Time</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={this.state.ledIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={this.toggleSwitch}
                                    value={this.state.ledIsEnabled}
                                />
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemLeft}>LED Off Time</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={this.state.ledIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={this.toggleSwitch}
                                    value={this.state.ledIsEnabled}
                                />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            );
        }
        else {
            return (
                <SafeAreaView>
                    <View>
                        <Text
                            style={styles.control_hello}>Hello,
                            Let’s Control Your Garden</Text>
                        <View style={styles.control_list}>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemLeft}>LED Lights</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={this.state.ledIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={this.toggleSwitchLED}
                                    value={this.state.ledIsEnabled}
                                    style={styles.listItemRight}
                                />
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemLeft}>Pump</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={this.state.pumpIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={this.toggleSwitchPump}
                                    value={this.state.pumpIsEnabled}
                                />
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.listItemLeft}>LED Schedule</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={this.state.scheduleIsEnabled ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={this.toggleSwitchSchedule}
                                    value={this.state.scheduleIsEnabled}
                                />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    control_hello: {
        opacity: 1,
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0)",
        color: "rgba(51, 61, 41, 1)",
        fontSize: 34,
        fontWeight: "400",
        fontStyle: "normal",
        fontFamily: "Apple Symbols",
        textAlign: "left",
        width: 312,
        height: 74,
        left: 39,
        top: 88,
        borderColor: "#FF0000", //red
        borderWidth: 1,
    },
    control_list: {
        flex: 1,
        opacity: 1,
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0)",
        color: "rgba(51, 61, 41, 1)",
        fontSize: 24,
        fontWeight: "400",
        fontStyle: "normal",
        fontFamily: "Apple Symbols",
        textAlign: "left",
        left: 39,
        top: 276,
        borderColor: "#FF0000", //red
        borderWidth: 1,
        width: 312,
    },
    listItem: {
        flex: 1,
        flexDirection: "row",
        borderColor: "#FF0000", //red
        borderWidth: 1,
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
});
export default ControlScreen;
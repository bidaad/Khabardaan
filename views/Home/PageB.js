import React, { Component } from "react";
import { View, Text } from "react-native";

export default class PageB extends Component {
  render() {
    return (<View style={{ flex: 1, backgroundColor: "green" }} >
        <Text>this is page B</Text>
    </View>);
  }
}

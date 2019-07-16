import React, { Component } from "react";
import { View ,Text} from "react-native";


import Header from "../components/Header";

export default class About extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "blue" }}>
        <Header navigation={this.props.navigation} />
        <Text>About Us</Text>
      </View>
    );
  }
}

import React, { Component } from "react";
import { View, Text } from "react-native";

import CustomTabNavigator from "../components/CustomTabNavigator";
import Header from "../components/Header";
import PageA from "../views/Home/PageA";
import NewsByCatCode from "./NewsByCatCode";

export default class Home extends Component {
  constructor(props) {
    super(props)
    global.APIPath = 'http://api.khabardaan.ir/api/';

    this.state = {
       
    };
  };
  
  static router = PageA.router;

  render() {

    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
        {/* <CustomTabNavigator navigation={this.props.navigation} /> */}
        
        <PageA navigation={this.props.navigation} />
        {/* <NewsListNavigator navigation={this.props.navigation} /> */}
      </View>
    );
  }
}

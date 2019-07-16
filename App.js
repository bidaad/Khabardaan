import { Ionicons } from "@expo/vector-icons";
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";

import CustomDrawerNavigator from "./components/CustomDrawerNavigator";
import Home from "./views/Home";
import Settings from "./views/Settings";
import About from "./views/About";
import NewsByCatCode from "./views/NewsByCatCode";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

console.disableYellowBox = true;
const MainDrawer = createDrawerNavigator(
  {
    Khabardaan: {
      navigationOptions: {
        drawerLabel: "خبردان"
      },
      screen: Home
    },

    Home: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" style={{ color: tintColor }} />
        ),
        drawerLabel: "صفحه اصلی",
      },
      screen: Home,
    },
    Settings: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-settings" style={{ color: tintColor }} />
        ),
        drawerLabel: "تنظیمات"
      },
      screen: Settings
    },

    About: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" style={{ color: tintColor }} />
        ),
        drawerLabel: "About"
      },
      screen: About
    },
    About21: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" style={{ color: tintColor }} />
        ),
        drawerLabel: null
      },
      screen: About
    }
  },
  {
    contentComponent: CustomDrawerNavigator,
    drawerPosition: 'right',
    drawerOpenRoute: 'DrawerRightOpen',
    useNativeAnimations: true,
    drawerToggleRoute: 'DrawerToggle',
  }
);



const App = createAppContainer(MainDrawer);
export default App;



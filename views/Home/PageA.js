import React, { Component } from 'react'
import { createStackNavigator } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation";

import MainPage from "../MainPage";
import NewsByCatCode from "../NewsByCatCode";
import ShowNews from "../ShowNews";
import NewsByCodeList from "../NewsByCodeList";
import SearchNews from "../SearchNews";


const NewsTabNavigator = createMaterialTopTabNavigator(
  {
    NewsByCatCode: {
      navigationOptions: {
        tabBarLabel: "جدیدترین",
        otherParam: 'anything you want here'
      },
      screen: (props) => <NewsByCatCode {...props } sort="Code" /> 
    },
    PageB: {
      navigationOptions: {
        tabBarLabel: "پربازدیدترین"
      },
      screen: (props) => <NewsByCatCode {...props } sort="VisitCount" />  

    }
  },
  {
    tabBarPosition: "top"
  }
);



const MainNavigator = createStackNavigator({
  Home: { screen: MainPage },
  GetListByCatCodeScreen: { screen: NewsByCatCode },
  ShowNews: { screen: ShowNews },
  MyTabNavigator: { screen: NewsTabNavigator },
  NewsByCodeList: { screen: NewsByCodeList },
  SearchNews: { screen: SearchNews }
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }

);


MainNavigator.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 0,
  swipeEnabled: navigation.state.index === 0,
});

export default MainNavigator;

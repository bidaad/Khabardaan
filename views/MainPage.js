import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity,Button } from 'react-native';
import CatList from './CatList'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { Icon } from 'react-native-elements'
import Header from "../components/Header";

const
  BODY_COLOR = '#000022',
  TEXT_MUTED = '#888888';

// custom constants
var constants = {
  BODY_COLOR, TEXT_MUTED,
};

// custom classes
var classes = {
  title: {
    color: 'red',
  },
  font1: {
    fontFamily: "irsans",
    fontSize: 30,
    textAlign: "center",
  },
  font2: {
    fontFamily: "byekan",
    fontSize: 30,
    textAlign: "center",
  },
  font3: {
    fontFamily: "nazanin",
    fontSize: 30,
    textAlign: "center",
  }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();
const c = constants = bootstrapStyleSheet.constants;

export default class MainPage extends Component {
  static navigationOptions = {
    title: null,
    header: null,
  };

  constructor(props) {
    super(props)
    
  }


  clickToNavigate = () => {
    this.props.navigation.navigate(
      'GetListByCatCodeScreen');
    console.log(this.props.navigation.navigate);

  }

  render() {
    return (
      <View style={[s.body]} >
        {/* <Text style={classes.font1}>
          متن پیام
        </Text>
        <Text style={classes.font2}>
          متن پیام
        </Text>
        <Text style={classes.font3}>
          متن پیام
        </Text>  */}
        {/* <View style={[s.btn, s.btnPrimary]}>
          <Text style={[s.btnText, s.btnTextPrimary]}>خبردان</Text>
        </View> */}
        {/* <Icon
  name='rowing' />

<Icon
  name='g-translate'
  color='#00aced' />

<Icon
  name='sc-telegram'
  type='evilicon'
  color='#517fa4'
/>

<Icon
  reverse
  name='ios-american-football'
  type='ionicon'
  color='#517fa4'
/>

<Icon
  
  name='heartbeat'
  type='font-awesome'
  color='#f50'
  onPress={() => console.log('hello')} /> */}
        
        <CatList navigation={this.props.navigation} ></CatList>
      </View>
    );

  }
}

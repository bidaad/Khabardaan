import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import Header from "../components/Header";
import CustomTabNavigator from "../components/CustomTabNavigator";
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Dialog from "react-native-dialog";

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
    color: 'white',
  },
  font1: {
    fontFamily: "irsans",
    fontSize: 30,
    textAlign: "center",
  },
  font2: {
    fontFamily: "IRANSansMobile(FaNum)_Light",
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

export default class Settings extends Component {
  state = {
    dialogVisible: false
  };
  
  
  static router = CustomTabNavigator.router;


  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  render() {
    return (
      <MenuProvider >
        <Header navigation={this.props.navigation} />
        <Text style={[s.btn, s.btnPrimary, classes.title]} >
          تنظیمات
        </Text>

        <Text>Hello world!</Text>
        <Menu onSelect={value => alert(`Selected number: ${value}`)}>
          <MenuTrigger text='Select option' />
          <MenuOptions>
            <MenuOption value={1} text='One' />
            <MenuOption value={2}>
              <Text style={{ color: 'red' }}>Two</Text>
            </MenuOption>
            <MenuOption value={3} disabled={true} text='Three' />
          </MenuOptions>
        </Menu>

        <TouchableOpacity onPress={this.showDialog}>
          <Text>Show Dialog</Text>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
        </Dialog.Container>
      </MenuProvider>
    );
  }
}

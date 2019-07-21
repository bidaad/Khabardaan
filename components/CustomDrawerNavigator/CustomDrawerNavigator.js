import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { DrawerItems } from "react-navigation";

import styles from "./styles";
import Dialog from "react-native-dialog";
import { Icon } from 'react-native-elements'



//const CustomDrawerNavigator = props => (
class CustomDrawerNavigator extends Component {
  state = {
    dialogVisible: false
  };

  goHome = () => {
    const { navigate } = this.props.navigation;
    navigate('Home');
  };

  goSettings = () => {
    const { navigate } = this.props.navigation;
    navigate('Settings');
  };

  showDialog = () => {
    this.setState({ dialogVisible: true });
    //const { navigate } = this.props.navigation;
    //navigate('ShowNews');
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };


  render() {
    return (

      <View style={[styles.container]}>
        <View style={[styles.topHeader]}>
          <ImageBackground source={require('../../img/backblue1.jpg')} style={styles.backgroundImage} >
          </ImageBackground>
        </View>
        <View style={[styles.itemContainer]}>
          <TouchableOpacity style={[styles.drawerRow]} onPress={this.goHome}>
            <View style={[styles.icons]}>
              <Icon
                name='home'
                type='font-awesome'
                color='#168310'
              />
            </View>
            <Text style={[styles.textItem]} >صفحه اصلی</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.drawerRow]} onPress={this.showDialog}>
            <View style={[styles.icons]}>
              <Icon
                name='heartbeat'
                type='font-awesome'
                color='#f50'
              />
            </View>
            <Text>درباره خبردان</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={[styles.drawerRow]} onPress={this.goSettings}>
            <View style={[styles.icons]}>
              <Icon
                name='cog'
                type='font-awesome'
                color='#168310'
              />
            </View>
            <Text style={[styles.textItem]} >تنظیمات</Text>
          </TouchableOpacity> */}
        </View>
        

        {/* <DrawerItems
          activeBackgroundColor={"black"}
          activeTintColor={"white"}
          iconContainerStyle={styles.icons}
          {...this.props}
        /> */}
      </View>
    )
  }
  //);
}

export default CustomDrawerNavigator;



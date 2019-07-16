import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { Icon } from 'react-native-elements'
import styles from "./styles";



const Header = ({ navigation }) =>   (
  
  <View style={[styles.container]}>
    <View style={[styles.LeftCol]}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} >
      <Icon
          name='align-justify'
          type='font-awesome'
          color='#fff'
        />
      </TouchableOpacity>
      <View style={[styles.captionContainer]}>
        <Image source={require('../../img/logocaption.png')} />
      </View>
    </View>

    <View style={[styles.RightCol]}>
      {navigation.state.index !== 0 ? <TouchableOpacity style={[styles.iconContainer, {paddingTop:0}]} onPress={() => navigation.goBack(null)} >
        <Icon
          name='ios-arrow-dropleft'
          type='ionicon'
          color='#fff'
          fontWeight= 'bold'
        /></TouchableOpacity> : null}
      <TouchableOpacity style={[styles.iconContainer]} onPress={() => navigation.push('NewsByCodeList')} >
      <Icon
          name='ios-bookmark'
          type='ionicon'
          color='#fff'
        />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.iconContainer]} onPress={() => navigation.push('SearchNews')} >
        <Icon
          name='search'
          type='font-awesome'
          color='#fff'
        />
      </TouchableOpacity>

    </View>

  </View>
);



export default Header;

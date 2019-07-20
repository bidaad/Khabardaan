import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import NewsList from '../components/NewsList';
import Tools from '../Tools';
import About from "../views/About";
import PageB from './Home/PageB';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
  import Header from "../components/Header";

  
export class NewsByCatCode extends Component {
    constructor(props) {
        super(props)
    }
    
    static navigationOptions = {
        title: 'مشاهده اخبار بر اساس گروه',
        headerLeft: null
    };
    

    render() {
        //console.log('par=' + routeName );
        
        const { params } = this.props.navigation.state;
        const strHeader = Tools.getCatHeader(params.catCode)
        return (
            <MenuProvider >
                <Text style={styles.header}>
                   اخبار {strHeader}
                </Text>
                <NewsList sort={this.props.sort} navigation={this.props.navigation} CatCode={params.catCode} />
            </MenuProvider>
        )
    }
}


export default NewsByCatCode

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#F7F7F7',
        borderWidth: 1,
        borderColor: '#DFDFDF',
        padding: 5,
        borderRadius: 5,
        fontSize: 20,
        fontFamily: "IRANSansMobile(FaNum)_Light",
        marginRight: 5,
    },

})
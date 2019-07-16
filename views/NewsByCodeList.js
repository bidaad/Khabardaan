import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import NewsList from '../components/NewsList';
import { AsyncStorage } from 'react-native';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';

  
export class NewsByCodeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newsCodeList: null
        };
        this._retrieveData('keyTaggedNews');
    }

    static navigationOptions = {
        title: 'اخبار علامت گذاری شده',
        headerLeft: null
    };


    _retrieveData = async (keyName) => {
        try {
            const value = await AsyncStorage.getItem(keyName).catch(error => {
                console.log(error);
            });;

            console.log('NL Master set' + value);

            this.setState({
                newsCodeList: value
            }
            )
            if (value !== null) {
                // We have data!!
                //console.log(value);
            }
            return value;
        } catch (error) {
            console.log(error);

        }
    };
    componentDidMount() {

    }


    render() {
        console.log('dddddddddd' + this.state.newsCodeList);

        return (
            <MenuProvider >
                
                <NewsList navigation={this.props.navigation} taggedCodeList={this.state.newsCodeList} />
            </MenuProvider>
        )
    }
}


export default NewsByCodeList

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F7F7F7',
        borderWidth: 1,
        borderColor: '#DFDFDF',
        padding: 5,
        borderRadius: 5,
        fontSize: 20,
        fontFamily: "byekan",
        marginRight: 5,
    },

})
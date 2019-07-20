import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import NewsList from '../components/NewsList';
import Tools from '../Tools';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Input, Icon } from 'react-native-elements'


export class NewsByCatCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Keyword: '',
            startSearch: false
        };

    }

    static navigationOptions = {
        headerVisible: false,
    };

    doSearch() {
        console.log('hello' + this.state.Keyword)
        this.setState(
            {
                startSearch: true,
            }
        )
        Keyboard.dismiss();
        return;
        //const { Keyword } = this.state;
        //alert(Keyword)
        let username = this.state.username;
        console.log(username);
    }

    componentDidMount(){
        const { params } = this.props.navigation.state;
        if (params != undefined)
            this.setState(
                { Keyword: params.txtKeyword }
            )

    }

    render() {

        console.log('search render');
        
        //const defaultVal =  'bbbbbbbbbbb'//this.state.Keyword != '' ? this.state.Keyword : '';
        //const defaultVal = this.state.Keyword;// = 'aaaaaaaaa'

        if (this.state.startSearch)
            return (
                <MenuProvider >
                    <View style={styles.SearchBar}>
                        
                        <View style={styles.innerSearchBar}>
                            <Input
                                defaultValue={this.state.Keyword}
                                inputContainerStyle={styles.searchTextbox}
                                textAlign='right'
                                autoFocus='true'
                                returnKeyLabel='done'
                                ref={(el) => { this.Keyword = el; }}
                                onChangeText={(Keyword) => this.setState({ Keyword: Keyword, startSearch: false })}
                                value={this.state.Keyword}
                                leftIcon={
                                    <Icon
                                        name='search'
                                        type='font-awesome'
                                        size={24}
                                        color='#8C8C8C'
                                        onPress={() => this.doSearch(this.state.Keyword)
                                        }
                                    />
                                }
                            />

                        </View>
                    </View>
                    <NewsList SearchKeyword={this.state.Keyword} navigation={this.props.navigation} />
                </MenuProvider>
            )
        else
            return (
                <MenuProvider >
                    <View style={styles.SearchBar}>
                        <View style={styles.innerSearchBar}>
                            <Input
                                style={[{textAlignVertical: 'bottom',}]}
                                defaultValue={this.state.Keyword}
                                inputContainerStyle={styles.searchTextbox}
                                textAlign='right'
                                autoFocus='true'
                                returnKeyLabel='done'
                                ref={(el) => { this.Keyword = el; }}
                                onChangeText={(Keyword) => this.setState({ Keyword: Keyword, startSearch: false })}
                                value={this.state.Keyword}
                                onSubmitEditing={() => this.doSearch(this.state.Keyword)}
                                leftIcon={
                                    <Icon
                                        name='search'
                                        type='font-awesome'
                                        size={24}
                                        color='#8C8C8C'
                                        onPress={() => this.doSearch(this.state.Keyword)
                                        }
                                    />
                                }
                            />

                        </View>
                    </View>

                </MenuProvider>
            )
    }
}

export default NewsByCatCode

const styles = StyleSheet.create({
    SearchBar: {
        backgroundColor: '#0077B9',
        padding: 10,

    },
    innerSearchBar: {
        backgroundColor: '#FFF',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFF',

    },
    searchTextbox: {
        height: 35,
        paddingTop: 10,
        borderBottomWidth: 0,
    }

})
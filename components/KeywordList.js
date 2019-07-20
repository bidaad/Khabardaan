'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Tools from '../Tools';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class KeywordList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            message: 'در حال بارگزاری',
            PageNo: 1,
            data: []
        }
    }

    componentWillReceiveProps() {

    }



    getRemoteData = () => {
        const { PageNo, data } = this.state;
        var url = global.APIPath

        if (this.props.EntityCode != undefined)
            url += 'newskeywords/' + this.props.EntityCode;
        else {
            this.setState({ message: 'بارگزاری با خطا مواجه شد', isLoading: false });
            return;
        }

        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log('success fetch');
                this.setState({
                    data: data.concat(res),
                    isLoading: false,
                    message: '',
                    PageNo: PageNo + 1,
                });
            })
            .catch(error => {
                this.setState({ message: 'بارگزاری با خطا مواجه شد', isLoading: false });
                //console.log('ERROR=' + error);
            });
    }

    _keyExtractor = (item, index) => index.toString();
    clickHandler = (keywordName) => {
        const { navigate } = this.props.navigation;
        this.props.navigation.push('SearchNews', { txtKeyword: keywordName });
    }

    componentDidMount() {

        if (this.props.EntityCode != undefined) {
            this.setState(
                {
                    isLoading: true,
                    message: 'در حال بارگزاری',
                    PageNo: 1,
                    data: []
                }
            )
            this.getRemoteData(this.props.EntityCode);
        }
    }


    render() {
        const spinner = this.state.isLoading ? <ActivityIndicator size='large' /> : null;
        const { data, message } = this.state;

        return (
            <View style={[{ padding: 10 }]} >

                <FlatList
                    numColumns={1}
                    data={data}
                    horizontal={true}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => this.clickHandler(item.Name)}>
                            <Text
                                style={styles.keyword}
                                
                            >{item.Name}
                            </Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        )
    }
}


const styles = EStyleSheet.create({
    keyword: {
        borderWidth: 1,
        borderColor: '#ED3A4A',
        borderRadius: 5,
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#F0626F',
        textAlign: 'center',
        fontFamily: "IRANSansMobile(FaNum)_Light",
        margin: 3,
        color: '#FFF'
    },

});


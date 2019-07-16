'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class CatList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            message: 'در حال بارگزاری'
        }

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };

        this.state = {
            orientation: isPortrait() ? 'portrait' : 'landscape'
        };

        // Event Listener for orientation changes
        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
    }

    componentDidMount() {
        this.getRemoteData();
    }
    getRemoteData = () => {
        var url = global.APIPath + 'allcatswithpic';

        //url = 'https://jsonplaceholder.typicode.com/todos/1'
        console.log('Try get URL=' + url);
        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log('success fetch');
                this.setState({
                    data: res,
                    isLoading: false,
                    message: ''
                });
            })
            .catch(error => {
                this.setState({ message: 'بارگزاری با خطا مواجه شد', isLoading: false });
                console.log('ERROR=' + error);
            });

    }


    _keyExtractor = (item, index) => index.toString();
    clickHandler = (CatCode) => {
        console.log('Code=' + CatCode);
        const { navigate } = this.props.navigation;
        navigate('MyTabNavigator', { catCode: CatCode });

    }


    render() {
        const entireScreenWidth = Dimensions.get('window').width;
        EStyleSheet.build({ $rem: entireScreenWidth / 70 });

        const spinner = this.state.isLoading ?
            <ActivityIndicator size='large' /> : null;

        const { data, message } = this.state;
        const numColumns = this.state.orientation === 'portrait' ? 3 : 5;
        const flatKeyVal = this.state.orientation === 'portrait' ? 1 : 2;
        const min = 1;
        const max = 100;
        const rand = min + Math.random() * (max - min);

        return (
            <ScrollView style={styles.FullWidth} >

                {spinner}
                <Text>
                    {message}
                </Text>
                <FlatList
                    style={styles.FullWidth}
                    key={flatKeyVal}
                    numColumns={(numColumns)}
                    data={data}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={styles.GridCell} onPress={() => this.clickHandler(item.catcode)} key={item.code}  >
                            <Image style={styles.thumb} key={new Date()} source={{ uri: item.imgurl + "?rnd=" + rand }} />
                            <Text style={Estyles.caption}>{item.catname}</Text>
                        </TouchableOpacity>
                    }
                />
            </ScrollView>
        )
    }
}


//test1

const Estyles = EStyleSheet.create({
    caption: {
        textAlign: 'center',
        width: '100%',
        fontFamily: "byekan",
        color: '#000000',
        fontSize: '2rem'
    },
});


const styles = StyleSheet.create({
    FullWidth: {
        width: '100%'
    },
    GridCell: {
        width: '32%',
        aspectRatio: 0.9,
        margin: 3,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },

    image: {
    },

    thumb: {
        width: '100%',
        aspectRatio: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});

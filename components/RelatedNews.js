'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, FlatList, TouchableOpacity,Dimensions } from 'react-native';
import Tools from '../Tools';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';


class NewsItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tagChanged: false,
            taggedNewsCodes: null,

        }
    };

    clickHandler = () => {
        this.props.clickHandler(this.props.newsCode);
    }

    render() {
        const { item } = this.props;

        var NewsTitle = item.Title;
        NewsTitle = Tools.removeSpecialChars(NewsTitle);
        var tagImage = <Image source={require('../img/tag.png')} />

        return (
            <TouchableOpacity style={s.NewsRow} onPress={() => this.clickHandler(item.Code)} key={item.Code} >
                <Text style={s.title} >{NewsTitle}</Text>
            </TouchableOpacity >
        )
    }

}

export default class RelatedNews extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            message: 'در حال بارگزاری',
            PageNo: 1,
            data: []
        }
    }

    timeout(ms, promise) {
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            reject(new Error("timeout"))
          }, ms)
          promise.then(resolve, reject)
        })
      }

    getRemoteData = (EntityCode) => {
        const { PageNo, data } = this.state;
        var url = global.APIPath

        url += 'relatednews/' + EntityCode + "?pageNo=" + PageNo;
        console.log('RELNEWS URL=' + url);

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
    clickHandler = (newsCode) => {
        const { push } = this.props.navigation;
        push('ShowNews', { newsCode: newsCode });
    }

    componentDidMount(){
        if(this.props.entityCode != undefined)
            this.getRemoteData(this.props.entityCode);
    }

    render() {
        
        //const spinner = this.state.isLoading ? <ActivityIndicator size='large' /> : null;

        const { data, message } = this.state;

        return (
            
            <View >
                {!this.state.isLoading ? <Text style={[s.btn, s.btnWarning, classes.newsTitle]} >اخبار مرتبط </Text> : null} 
                
                <FlatList
                    numColumns={1}
                    data={data}
                    onEndReached={this.getRemoteData}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) =>
                        <NewsItem item={item}
                            clickHandler={this.clickHandler}
                            newsCode={item.Code}
                        />
                    }
                />
            </View>
        )
    }
}

const
    BODY_COLOR = '#F2F0F0',
    TEXT_MUTED = '#888888';

const win = Dimensions.get('window');
// custom constants
var constants = {
    BODY_COLOR, TEXT_MUTED,
};

// custom classes
var classes = {
    NewsRow: {
        borderBottomWidth: 10,
        borderColor: '#EAEAEA',
        borderRadius: 5,
        alignItems: 'flex-start',
        padding: 8,
        backgroundColor: '#F4F2F2',
        textAlign: 'right',
        fontFamily: "IRANSansMobile(FaNum)_Light",
        flex: 1
    },
    NewsRow2Col: {
        borderBottomWidth: 10,
        borderColor: '#EAEAEA',
        borderRadius: 5,
        padding: 8,
        backgroundColor: '#F4F2F2',
        textAlign: 'right',
        fontFamily: "IRANSansMobile(FaNum)_Light",
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    LeftCol: {
        width: '70%',
    },
    RightCol: {
        width: '30%'
    },
    title: {
        fontFamily: "IRANSansMobile(FaNum)_Light",
        padding: 5,
        fontSize: 15,
        lineHeight: 23,
    },
    smallText: {
        fontFamily: "IRANSansMobile(FaNum)_Light",
        padding: 5,
        fontSize: 12,
        color: '#AFADAD'
    },
    caption: {
        textAlign: 'center',
        width: '100%',
        fontFamily: "IRANSansMobile(FaNum)_Light",
    },
    ImageContainer: {
        margin: 3,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },

    thumb: {
        width: 110,
        height: 110,
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

    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
};



const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = classes = bootstrapStyleSheet.create();
const c = constants = bootstrapStyleSheet.constants;





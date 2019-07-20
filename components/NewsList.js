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
    RefreshControl,
    ToastAndroid
} from 'react-native';
import Tools from '../Tools';
import { AsyncStorage } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';


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


    tagClickHandler = () => {
        AsyncStorage.getItem('keyTaggedNews')
            .then(
                (taggedNewsCodes) => {
                    console.log('before=' + taggedNewsCodes);

                    if (taggedNewsCodes !== undefined && taggedNewsCodes !== null && taggedNewsCodes !== '') {
                        taggedNewsCodes = taggedNewsCodes.toString();

                        var taggedNewsCodesArray = taggedNewsCodes.split(',')
                        if (taggedNewsCodesArray.includes(this.props.newsCode.toString())) {
                            for (var i = 0; i < taggedNewsCodesArray.length; i++) {
                                if (taggedNewsCodesArray[i] === this.props.newsCode.toString()) {
                                    taggedNewsCodesArray.splice(i, 1);
                                }
                            }
                            taggedNewsCodes = taggedNewsCodesArray.join();
                        }
                        else {
                            if (taggedNewsCodes === '')
                                taggedNewsCodes = this.props.newsCode;
                            else
                                taggedNewsCodes += ',' + this.props.newsCode;
                        }
                    }
                    else {
                        taggedNewsCodes = this.props.newsCode
                    }
                    this.setState(
                        {
                            taggedNewsCodes: taggedNewsCodes,
                            tagChanged: true
                        }
                    )
                    console.log('after=' + taggedNewsCodes);

                    this.props.setNewsCode(taggedNewsCodes);
                    async () => {
                        await AsyncStorage.setItem('keyTaggedNews', taggedNewsCodes).catch(error => {
                            console.log(error);
                        });
                    }

                })
            .catch(error => {
                console.log(error);
            });


        //var taggedNewsCodes = this.props.tagList;

        console.log('state tag list=' + this.state.taggedNewsCodes);

        // var taggedNewsCodes = this.state.taggedNewsCodes == null ? this.props.tagList : this.state.taggedNewsCodes;
        // if (taggedNewsCodes !== undefined && taggedNewsCodes !== null && taggedNewsCodes !== '') {
        //     taggedNewsCodes = taggedNewsCodes.toString();

        //     console.log('tagChanged=' + this.state.tagChanged);
        //     console.log('before=' + taggedNewsCodes);

        //     var taggedNewsCodesArray = taggedNewsCodes.split(',')
        //     if (taggedNewsCodesArray.includes(this.props.newsCode.toString())) {
        //         for (var i = 0; i < taggedNewsCodesArray.length; i++) {
        //             if (taggedNewsCodesArray[i] === this.props.newsCode.toString()) {
        //                 taggedNewsCodesArray.splice(i, 1);
        //             }
        //         }
        //         taggedNewsCodes = taggedNewsCodesArray.join();
        //     }
        //     else {
        //         if (taggedNewsCodes === '')
        //             taggedNewsCodes = this.props.newsCode;
        //         else
        //             taggedNewsCodes += ',' + this.props.newsCode;
        //     }
        // }
        // else {
        //     taggedNewsCodes = this.props.newsCode
        // }
        // console.log('after=' + taggedNewsCodes);

        // this.props.setNewsCode(taggedNewsCodes)
        // console.log('tag was changed' + taggedNewsCodes);

        // this.setState(
        //     {
        //         taggedNewsCodes: taggedNewsCodes,
        //         tagChanged: true
        //     }
        // )

    }

    render() {
        const entireScreenWidth = Dimensions.get('window').width;
        EStyleSheet.build({ $rem: entireScreenWidth / 70 });

        const { item } = this.props;

        var NewsTitle = item.Title;
        const NDate = item.NDate;
        const NTime = item.NTime;

        //console.log('title=' + NewsTitle);

        NewsTitle = Tools.removeSpecialChars(NewsTitle);
        var tagImage = <Image source={require('../img/tag.png')} />
        var taggedNewsCodes = this.state.tagChanged ? this.state.taggedNewsCodes : this.props.tagList;
        var taggedNewsCodes = this.state.taggedNewsCodes;

        if (taggedNewsCodes !== undefined && taggedNewsCodes !== null && taggedNewsCodes !== '') {
            taggedNewsCodes = taggedNewsCodes.toString();
            var taggedNewsCodesArray = taggedNewsCodes.split(',')

            if (taggedNewsCodesArray.includes(this.props.newsCode.toString()))
                tagImage = <Image source={require('../img/tag-filled.png')} />
            else
                tagImage = <Image source={require('../img/tag.png')} />
        }



        if (item.ImgUrl)
            if (this.props.onlyPic)
                return(
                <TouchableOpacity activeOpacity={1} style={styles.onlyPicConatiner} onPress={() => this.clickHandler(item.Code)} key={item.Code}  >

                    <View >
                        <View style={styles.ImageContainer}>
                            <Image style={[styles.thumb]} source={{ uri: item.ImgUrl }} />
                        </View>
                    </View>

                    <View  style={[{ width: '100%' }]}>
                        <Text style={styles.caption}>{NewsTitle}</Text>

                    </View>
                    
                </TouchableOpacity >
                )
            else
                return (
                    <TouchableOpacity style={styles.NewsRow2Col} onPress={() => this.clickHandler(item.Code)} key={item.Code}  >

                        <View style={styles.RightCol}>
                            <View style={styles.ImageContainer}>
                                <Image style={[styles.thumb]} source={{ uri: "http://static.parset.com/Files/News/" + item.PicName }} />
                            </View>
                        </View>

                        <View style={styles.LeftCol}>
                            <Text style={styles.caption}>{NewsTitle}</Text>

                        </View>
                        <View style={[{ width: '50%' }]}>
                            <Text style={styles.smallText}>
                                {item.ResourceName}
                            </Text>
                        </View>
                        <View style={[{ flexDirection: 'row', alignItems: 'flex-end', width: '50%', flexDirection: 'row-reverse' }]}>
                            <View style={styles.dateInfo}>
                                <TouchableOpacity onPress={this.tagClickHandler}>
                                    {tagImage}
                                </TouchableOpacity>
                                <Text style={styles.mediumText}>{NDate}</Text>
                                <Text style={styles.mediumText}>{NTime}</Text>
                            </View>
                        </View>
                    </TouchableOpacity >
                )
        else
            return (
                <TouchableOpacity style={styles.NewsRow} onPress={() => this.clickHandler(item.Code)} key={item.Code} >
                    <View style={[{ width: '100%' }]}>
                        <Text style={styles.caption} >{NewsTitle}</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={[styles.RightCol, { width: '70%' }]}>
                            <Text style={[styles.smallText]} >{item.ResourceName}</Text>
                        </View>
                        <View style={[styles.LeftCol, { felx: 1, flexDirection: 'row', alignContent: 'flex-end', width: '30%', flexDirection: 'row-reverse' }]}>
                            <View style={styles.dateInfo}>
                                <TouchableOpacity onPress={this.tagClickHandler}>
                                    {tagImage}
                                </TouchableOpacity>
                                <Text style={styles.mediumText}>{NDate}</Text>
                                <Text style={styles.mediumText}>{NTime}</Text>
                            </View>

                        </View>
                    </View>
                </TouchableOpacity >
            )

    }

}

export default class NewsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            message: 'در حال بارگزاری',
            PageNo: 1,
            data: []
        }
        this._retrieveData('keyTaggedNews');

    }

    _storeData = async (keyName, keyVal) => {
        try {
            await AsyncStorage.setItem(keyName, keyVal).catch(error => {
                console.log(error);
            });
        } catch (error) {
            //console.log(error);
        }
    };


    _retrieveData = (keyName) => {
        try {
            const value = AsyncStorage.getItem(keyName).then((val) => {

                this.setState({
                    newsCodeList: val
                }
                )
                this.getRemoteData();
            }).catch(error => {
                console.log(error);
            });

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
            //console.log(error);

        }
    };

    componentWillReceiveProps() {

        if (this.props.SearchKeyword != undefined) {
            this.setState(
                {
                    isLoading: true,
                    message: 'در حال بارگزاری',
                    PageNo: 1,
                    data: []
                }
            )
            this.getRemoteData(this.props.SearchKeyword);
        }
    }

    getRemoteData = () => {
        //this._storeData('keyTaggedNews', '')
        const { PageNo, data } = this.state;
        var url = global.APIPath

        var sort = "latest"
        if (this.props.sort)
            sort = this.props.sort

        if (this.props.CatCode != undefined) {
            if (this.props.CatCode == "100")//only pic news
                url += 'picnews/' + "?pageNo=" + PageNo + "&sort=" + sort;
            else
                url += 'newsbycatcode/' + this.props.CatCode + "?pageNo=" + PageNo + "&sort=" + sort;
        }
        else if (this.props.taggedCodeList != undefined)
            url += 'newsbycodelist/' + this.props.taggedCodeList + "?pageNo=" + PageNo;
        else if (this.props.SearchKeyword != undefined)
            url += 'newssearch/' + this.props.SearchKeyword + "?pageNo=" + PageNo;
        else {
            this.setState({ message: 'بارگزاری با خطا مواجه شد', isLoading: false });
            return;
        }
        console.log('CUR URL=' + url);

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
        const { navigate } = this.props.navigation;
        this.props.navigation.push('ShowNews', { newsCode: newsCode });
    }

    changeNewsCode = (strNewsCode) => {
        console.log('stored:' + strNewsCode);

        this._storeData('keyTaggedNews', strNewsCode.toString())
        this.setState({
            newsCodeList: strNewsCode
        }
        )
    }

    componentDidMount() {

        //this.getRemoteData();
    }

    _onRefresh = () => {
        this._retrieveData('keyTaggedNews');
        this.setState({ isLoading: true });
        this.getRemoteData();
    }

    render() {
        //this._storeData('keyTaggedNews', '')
        const spinner = this.state.isLoading ? <ActivityIndicator size='large' /> : null;
        const { data, message, isLoading } = this.state;
        //console.log('val=' + this.state.newsCodeList);

        console.log('data len=' + this.props.taggedCodeList);
        
        if (this.props.ShowTaggedNews == "1" && data.length == 0 && isLoading == false)
        {
            ToastAndroid.showWithGravity(
                'هیچ خبری علامت گذاری نشده است',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }


        var onlyPic = false;
        if (this.props.CatCode != undefined) {
            if (this.props.CatCode == "100")//only pic news
                onlyPic = true;
        }

        return (
            <View >
                {spinner}

                <FlatList
                    numColumns={1}
                    data={data}
                    onEndReached={this.getRemoteData}
                    keyExtractor={this._keyExtractor}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={this._onRefresh}
                        />
                    }
                    renderItem={({ item }) =>
                        <NewsItem item={item}
                            onlyPic={onlyPic}
                            clickHandler={this.clickHandler}
                            tagList={this.state.newsCodeList}
                            newsCode={item.Code}
                            setNewsCode={this.changeNewsCode}
                        />
                    }
                />
            </View>
        )
    }
}




const styles = EStyleSheet.create({
    NewsRow: {
        borderBottomWidth: 10,
        borderColor: '#EAEAEA',
        borderRadius: 5,
        alignItems: 'flex-start',
        padding: 8,
        backgroundColor: '#F4F2F2',
        textAlign: 'right',
        fontFamily: "IRANSansMobile(FaNum)_Light",
        flex: 1,
    },
    onlyPicConatiner:{
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
        alignItems: 'center',
        width:'97%',
        marginRight: 15,

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
        color: '#AFADAD',
        fontSize: '1.5rem',
    },
    mediumText: {
        fontFamily: "IRANSansMobile(FaNum)_Light",
        padding: 5,
        color: '#AFADAD',
        fontSize: '2rem',
    },
    caption: {
        fontFamily: "IRANSansMobile(FaNum)_Light",
        padding: 5,
        color: '#AFADAD',
        fontSize: '2.5rem',
        paddingRight: 10,
        width: '100%',
        textAlign: 'left',
        color: '#323232',

        // paddingRight: 10,
        // width: '100%',
        // fontFamily: "IRANSansMobile(FaNum)_Light",
        // fontSize: '2.5rem',
        // width: '100%',
        // textAlign: 'left',
        // alignSelf: 'stretch',
        // lineHeight: 20,
        // fontWeight: 'bold'
    },
    ImageContainer: {
        margin: 3,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: '100%',
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

    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
    popupMenuContainer: {
        flex: 1,
        width: '100%',
        height: 30,
        top: -130,
        alignSelf: 'flex-end',
        alignSelf: 'stretch',
        position: 'relative',
        right: 0,
    },
    dateInfo: {
        flex: 1,
        flexDirection: 'row-reverse',
        paddingLeft: 10,
        width: '100%',

    }
});


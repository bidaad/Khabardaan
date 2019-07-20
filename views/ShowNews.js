import React, { Component } from 'react'
import { ScrollView, WebView, Text, View, Image,  TouchableOpacity, Dimensions, FlatList } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Tools from '../Tools';
import Share from 'react-native-share';
//import RNFetchBlob from "react-native-fetch-blob";
import RelatedNews from '../components/RelatedNews'
import KeywordList from '../components/KeywordList'
import AutoHeightImage from 'react-native-auto-height-image';
import EStyleSheet from 'react-native-extended-stylesheet';


const
    BODY_COLOR = '#F2F0F0',
    TEXT_MUTED = '#888888';

const win = Dimensions.get('window');
// custom constants
var constants = {
    BODY_COLOR, TEXT_MUTED,
};

// custom classes
var classes = EStyleSheet.create( {
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareButton: {
        width: '12%',
        margin: 8,
    },
    newsTitle: {
        color: '#FFFFFF',
        fontFamily: 'IRANSansMobile(FaNum)_Light'
    },
    newsContainer: {
        flex: 1
    },
    newsStory: {
        borderBottomWidth: 1,
        borderColor: '#0076B8',
        borderRadius: 5,
        padding: 20,
        backgroundColor: '#F2F0F0',
        textAlign: 'justify',
        alignSelf: 'stretch',
        fontFamily: "IRANSansMobile(FaNum)_Light",
        lineHeight: 23,
        fontSize: '2.6rem',
    },
    thumb: {
        flex: 1,
        alignSelf: 'stretch',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsImageContainer:{
        width:'100%',
        padding:5,
        margin:5,
        alignSelf:'center'
    },
    
});



const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();
const c = constants = bootstrapStyleSheet.constants;


export default class ShowNews extends Component {
    constructor(props) {
        super(props)

        this.state = {
            strTitle: '',
            strStory: '',
            strImgUrl: '',
            strImgBase64: '',
            newsCode : null,
            navigate : this.props.navigation,
            NewsImages: []
        }
    }

    getBase64Image = () => {
        // const fs = RNFetchBlob.fs;
        // let imagePath = null;
        // RNFetchBlob.config({
        //     fileCache: true
        // })
        //     .fetch("GET", this.state.strImgUrl)
        //     // the image is now dowloaded to device's storage
        //     .then(resp => {
        //         // the image path you can use it directly with Image component
        //         imagePath = resp.path();
        //         return resp.readFile("base64");
        //     })
        //     .then(base64Data => {
        //         this.setState({
        //             strImgBase64: base64Data
        //         })

        //         return fs.unlink(imagePath);
        //         //return JSON.stringify(base64Data);
        //     });

    }

    shareWhatsapp = () => {
        const shareOptions = {
            title: 'اشتراک بوسیله',
            message: this.state.strTitle,
            url: `data:image/jpeg;base64,` + this.state.strImgBase64,
            social: Share.Social.WHATSAPP
        };
        Share.shareSingle(shareOptions);
    }

    shareTelegram = () => {
        const shareOptions = {
            title: 'اشتراک بوسیله',
            message: this.state.strTitle,
            url: `data:image/jpeg;base64,` + this.state.strImgBase64,
        };
        Share.open(shareOptions);
    }

    shareInstagram = () => {
        const shareOptions = {
            title: 'اشتراک بوسیله',
            message: this.state.strTitle,
            url: `data:image/png;base64,` + this.state.strImgBase64,
            social: Share.Social.INSTAGRAM
        };
        Share.shareSingle(shareOptions);

        // const fs = RNFetchBlob.fs;
        // let imagePath = null;
        // RNFetchBlob.config({
        //     fileCache: true
        // })
        //     .fetch("GET", this.state.strImgUrl)
        //     // the image is now dowloaded to device's storage
        //     .then(resp => {
        //         // the image path you can use it directly with Image component
        //         imagePath = resp.path();
        //         return resp.readFile("base64");
        //     })
        //     .then(base64Data => {
        //         console.log('actual base64=' + base64Data);
        //         const shareOptions = {
        //             title: 'اشتراک بوسیله',
        //             message: this.state.strTitle,
        //             url: `data:image/png;base64,` + base64Data,
        //             social: Share.Social.INSTAGRAM
        //         };
        //         Share.shareSingle(shareOptions);

        //         return fs.unlink(imagePath);
        //         //return JSON.stringify(base64Data);
        //     });

    }

    shareEmail = () => {
        const shareOptions = {
            title: 'اشتراک بوسیله پست الکترونیک',
            message: this.state.strTitle,
            url: `data:image/png;base64,` + this.state.strImgBase64,
            social: Share.Social.EMAIL
        };
        Share.shareSingle(shareOptions);

    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        if(params.newsCode != undefined)
            this.getRemoteData(params.newsCode);
        
    }
    getRemoteData = (newsCode) => {
        const url = global.APIPath + 'news/' + newsCode;
        //console.log('SHOWNEWSURL=' + url);

        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log('success fetch');

                //const str64 = new Tools().convertImageUrlToBase64(res[0].ImgUrl)
                //console.log('image url=' + res[0].ImgUrl);
                //console.log('Return str=' + str64);

                this.setState({
                    strTitle:  Tools.removeSpecialChars(res[0].Title),
                    strStory: new Tools().GenParagraph( Tools.removeSpecialChars(res[0].Contents)),
                    strImgUrl: res[0].ImgUrl,
                    newsCode: res[0].Code,
                    NewsImages: res[0].NewsImages,
                    isLoading: false,
                    message: '',
                    //strImgbase64: str64
                });
                
                if(res[0].ImgUrl != '')
                    this.getBase64Image();

                   
            })
            .catch(error => {
                this.setState({ message: 'بارگزاری با خطا مواجه شد', isLoading: false });
                console.log('ERROR=' + error);
            });

    }



    render() {
        const { params } = this.props.navigation.state;

        const entireScreenWidth = Dimensions.get('window').width;
        EStyleSheet.build({$rem: entireScreenWidth / 70});

        const { strTitle, strStory, strImgUrl, newsCode, NewsImages } = this.state;

        //console.log('images=' + NewsImages);
        var str = '[{"Code":86109,"NewsCode":770224,"ImgUrl":"aaaaa"},{"Code":86110,"NewsCode":770224,"ImgUrl":"bbb"}]'
        console.log('strjson111=' + NewsImages);
        
        //var NewsImages = str.substring(1, str.length - 1);
        //NewsImages = JSON.parse(str);

        //const jsonImages = JSON.parse(NewsImages);
        //alert(NewsImages.length);
        const jsonImages = NewsImages != '' ? JSON.parse(NewsImages):  null;

        //alert(NewsImages)
        var storyWithImages = '';
        for( i=0; i < 5; i++)
        {
            storyWithImages += <Text>Test{i}</Text>;
        }

        if(strTitle)
        return (
            <ScrollView style={[s.body, classes.newsContainer]} >
                {strImgUrl ? <AutoHeightImage  width={win.width} style={classes.thumb}  source={{ uri: strImgUrl }} /> : null}

                <Text style={[s.btn, s.btnPrimary, classes.newsTitle]} >
                    {strTitle}
                </Text>

                <Text style={classes.newsStory}>
                    {strStory}
                </Text>
                <FlatList
                    data={jsonImages}
                    renderItem={({item}) => <View style={classes.newsImageContainer}>
                    <AutoHeightImage width={win.width - 10} style={classes.thumb}  source={{ uri: item.ImgUrl }} />
                    </View>
                    }
                />
                <KeywordList navigation={this.props.navigation} EntityCode={params.newsCode} />
                <View style={classes.buttonContainer}>
                    <TouchableOpacity style={classes.shareButton} onPress={this.shareTelegram}><Image source={require('../img/telegram.png')} /></TouchableOpacity>
                    <TouchableOpacity style={classes.shareButton} onPress={this.shareInstagram}><Image source={require('../img/instagram.png')} /></TouchableOpacity>
                    <TouchableOpacity style={classes.shareButton} onPress={this.shareWhatsapp}><Image source={require('../img/whatsapp.png')} /></TouchableOpacity>
                    <TouchableOpacity style={classes.shareButton} onPress={this.shareEmail}><Image source={require('../img/email.png')} /></TouchableOpacity>
                </View>
                
                <RelatedNews navigation={this.props.navigation} entityCode={params.newsCode} />
            </ScrollView>
        )
        else
            return null;
    }
}


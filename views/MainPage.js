import React, { Component } from 'react';
import { RefreshControl, StyleSheet, Text, View, ScrollView, ToolbarAndroid, AppState } from 'react-native';
import CatList from './CatList'
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Slideshow from 'react-native-image-slider-show';
import PushNotification from 'react-native-push-notification';

var NavigateFromPushNot = false;
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN11:', token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('NotNewsCode:', notification.userInfo);

    const newsCode = notification.userInfo;
    //navigate('ShowNews', { newsCode: notification.userInfo });
    NavigateFromPushNot = true;

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: '298913159701',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true
});

const
  BODY_COLOR = '#000022',
  TEXT_MUTED = '#888888';

// custom constants
var constants = {
  BODY_COLOR, TEXT_MUTED,
};

// custom classes
var classes = {
  title: {
    color: 'red',
  },
  font1: {
    fontFamily: "irsans",
    fontSize: 30,
    textAlign: "center",
  },
  font2: {
    fontFamily: "IRANSansMobile(FaNum)_Light",
    fontSize: 30,
    textAlign: "center",
  },
  font3: {
    fontFamily: "nazanin",
    fontSize: 30,
    textAlign: "center",
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  toolbar: {
    backgroundColor: '#2196F3',
    height: 56,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const s = styles = bootstrapStyleSheet.create();
const c = constants = bootstrapStyleSheet.constants;

export default class MainPage extends Component {
  static navigationOptions = {
    title: null,
    header: null,
  };

  constructor(props) {
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);

    this.state = {
      position: 1,
      interval: null,
      dataSource: [],
      dataImportantNews: [],
    };

  }


  getRemoteData = () => {
    var url = global.APIPath

    url += 'latestpicnews/';
    console.log('IMGURL=' + url);

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log('success fetch image');
        this.setState({
          dataSource: res,
          message: '',
        });
      })
      .catch(error => {
        //this.setState({ message: 'بارگزاری با خطا مواجه شد', isLoading: false });
      });
  }


  getImportantNews = () => {
    var url = global.APIPath

    url += 'latestimportantnews/';

    fetch(url)
      .then(res => res.json())
      .then(res => {

        PushNotification.cancelAllLocalNotifications();

        PushNotification.localNotificationSchedule({
          //... You can use all the options from localNotifications
          message: res[0].Title, // (required)
          userInfo: res[0].Code,
          date: new Date(Date.now() + 2 * 1000),
          repeatType: 'day'
        });
      })
      .catch(error => {
        //this.setState({ message: 'بارگزاری با خطا مواجه شد', isLoading: false });
      });
  }

  clickToNavigate = () => {
    this.props.navigation.navigate(
      'GetListByCatCodeScreen');
    console.log(this.props.navigation.navigate);

  }

  goToNews = (index) => {
    //alert(this.state.dataSource[index].Code)
    const { navigate } = this.props.navigation;
    navigate('ShowNews', { newsCode: this.state.dataSource[index].Code });

  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 7000)
    });
  }

  componentWillUnmount() {
    AppState.addEventListener('change', this.handleAppStateChange)
    clearInterval(this.state.interval);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
    this.getRemoteData();

    // PushNotification.localNotificationSchedule({
    //   //... You can use all the options from localNotifications
    //   message: 'aaaaaaaa', // (required)
    //   userInfo: '0000000000',
    //   date: new Date(Date.now() + 2 * 1000) // in 60 secs
    // });

    if(this.state.NavigateFromPushNot)
    {
      const { navigate } = this.props.navigation;
      navigate('ShowNews', { newsCode: this.state.newsCode });

    }
  }

  handleAppStateChange = (nextAppState) => {
    if (
      nextAppState === 'background'
    ) {
      this.getImportantNews();
      //console.log('App has come to the foreground!');
      // PushNotification.localNotificationSchedule({
      //   //... You can use all the options from localNotifications
      //   message: 'My Notification Message2', // (required)
      //   date: new Date(Date.now() + 10 * 1000) // in 60 secs
      // });
    }
    this.setState({ appState: nextAppState });
  };

  render() {

    return (

      <ScrollView style={[s.body]} >

        <View style={[{ margin: 6, width: '98%', textAlign: 'center', alignContent: 'center' }]}>

          <Slideshow
            style={[{ padding: 0, width: '100%', alignSelf: 'center', alignContent: 'center' }]}
            position={this.state.position}
            onPositionChanged={position => this.setState({ position })}
            dataSource={this.state.dataSource}
            onPress={({ index }) => this.goToNews(index)}
          />
        </View>
        <CatList navigation={this.props.navigation} ></CatList>

      </ScrollView>

    );

  }
}

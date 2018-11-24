import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon, Permissions, Location } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import axios from 'react-native-axios';
import {ipv4} from './config.json';
import KalmanFilter from 'kalmanjs';

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
    testing: 'hello!'
  };

  constructor(props) {
    super(props);
    //List view is depracated look into doing something different here
    this.state = {
      user: null,
      currentUserId: 1,
      profileImage: " ",
      nuggets: [],
      lat: 0,
      long: 0,
      errorMessage: null,
      distance: 0,
      connectedPotentialFriends: {}
    }

    this.lat_kalman = new KalmanFilter({ R: 0.01, Q: 65 });
    this.lng_kalman = new KalmanFilter({ R: 0.01, Q: 65 });

    this.socket = new WebSocket("ws://192.168.88.119:3001");
    this.getProfileInformation     = this.getProfileInformation.bind(this);
    this.sendLocationToServer      = this.sendLocationToServer.bind(this);
    this._getLocationAsync         = this._getLocationAsync.bind(this);
    this.receiveLocationFromServer = this.receiveLocationFromServer.bind(this);
    this.findConnection            = this.findConnection.bind(this);
    this.changeToUserOne           = this.changeToUserOne.bind(this);
    this.changeToUserTwo           = this.changeToUserTwo.bind(this);
    this.changeToUserThree         = this.changeToUserThree.bind(this);
    this.changeToUserFour          = this.changeToUserFour.bind(this)
  }

  componentDidMount() {
    this.socket.onopen = () => {
      setInterval(()=>{
        this._getLocationAsync();
      },2500)
      console.log("connected to server")
    }
    this.getProfileInformation();
    this.receiveLocationFromServer()
  }


  _getLocationAsync = async () => {

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState({
      lat: this.lat_kalman.filter(location.coords.latitude),
      long: this.lng_kalman.filter(location.coords.longitude),
    }, this.sendLocationToServer());
  };

  receiveLocationFromServer() {

    this.socket.onmessage = (event) => {
      const locationData = JSON.parse(event.data);
      const TESTING_userKey = Object.keys(...locationData)[0]
      const TESTING_distanceFromSource = [...locationData]
      const distanceFromSource = TESTING_distanceFromSource[0][TESTING_userKey].distance

      this.setState({
        distance : distanceFromSource,
        connectedPotentialFriends : locationData
      })
    }


  }
  

  sendLocationToServer() {
    var locationData = {
      currentUserId: this.state.currentUserId,
      lat: this.state.lat,
      long: this.state.long,
    }
    this.socket.send(JSON.stringify(locationData));
  }

  getProfileInformation() {
    axios.get(`${ipv4}/user/${this.state.currentUserId}`)
    .then((response)=> {
      const data = response.data
      this.setState({
        user: data.first_name,
        profileImage: data.profile_picture,
        nuggets: data.nuggets,
      })
    })
  }

  findConnection() {
    axios({
      method: 'post',
      url: `${ipv4}/user/${this.state.currentUser}/connections/new`,
      data: {
        userId: this.state.currentUserId,
      }
    })
    .then((res)=>{
      console.log("FIND CONNECTION  was pressed");
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // Functional buttons for testing:
  changeToUserOne() {
    this.setState({
      currentUserId :1,
    }, this.props.navigation)
  }
  changeToUserTwo() {
    this.setState({
      currentUserId :2,
    }, this.getProfileInformation)
  }
  changeToUserThree() {
    this.setState({
      currentUserId :3,
    }, this.getProfileInformation)
  }
  changeToUserFour() {
    this.setState({
      currentUserId :4,
    }, this.getProfileInformation)
  }


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator

          screenProps = {{
            user: this.state.user,
            currentUserId: this.state.currentUserId,
            profileImage : this.state.profileImage,
            nuggets: this.state.nuggets,
            lat : this.state.lat,
            long: this.state.long,
            errorMessage: this.state.errorMessage,
            changeToUserOne: this.changeToUserOne,
            changeToUserTwo :this.changeToUserTwo,
            changeToUserThree : this.changeToUserThree,
            changeToUserFour: this.changeToUserFour,
            findConnection: this.findConnection,
            distance: this.state.distance,
            connectedFriendsDistances: this.state.connectedPotentialFriends
          }}
          />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

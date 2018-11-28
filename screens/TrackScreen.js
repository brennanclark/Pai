import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Button, Animated} from 'react-native';
import QRCode from 'react-native-qrcode';
import { Ionicons } from '@expo/vector-icons';
import Barcode from '../screens/BarCode';
import Pulse from 'react-native-pulse';


class PulseLocation extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentColor: 'grey'
    }
  }

  componentWillReceiveProps(props) {
      const {testing, isCloseColor, middleCloseColor, farAwayColor, closestDistance, middleDistance, userId } = props
        let userDistance = 0;
  
        if(testing[0]){
          testing.forEach((user) => {
            if(user.userId == userId) {
              userDistance = user.distance
            }
          })
          if(userDistance <= closestDistance) {
            this.setState({
              currentColor: isCloseColor,
            })
          }
      
          if (userDistance <= middleDistance && userDistance > closestDistance) {
            this.setState({
              currentColor:middleCloseColor
            })
          }
      
          if(userDistance > middleDistance) {
            this.setState({
              currentColor:farAwayColor
            })
          }
        }
  }

  render() {

    return (
        <Pulse color={this.state.currentColor} numPulses={3} diameter={600} speed={10} duration={2000} />
    )
  }
}

function ProfileImage(props) {
  return (
    <View>
      <Image style={styles.trackImage} source={{uri: props.Image}}/>
      <Text style={styles.instruction}> Tap To Scan </Text>
    </View>
  )
}

class QrCode extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      isBarCode: true,
    }
  }

  _onPress = (event) => {
    this.setState((prevState) => {
      return {
        isBarCode: !prevState.isBarCode
      }
    });
  }

  render() {
    let qrConnection = this.props.connection;
    let qrConnectionString = qrConnection.toString();

    if(this.state.isBarCode) {
    return (
    <View>
      <View style={styles.qr}>
        <QRCode
          value= {qrConnectionString}
          size={200}
          bgColor='black'
          fgColor='white'
          borderRadius={5}
        />
      </View>
      <View>
        <TouchableOpacity
          name="scan"
          style={styles.captureBtn}
          onPress={this.takePicture}>

          <Ionicons
            name='ios-camera'
            color='black'
            size={50}
            onPress={this._onPress}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
    </View>
      )
    }
    return (
      <View>
        <Barcode
        currentUserId={this.props.currentUserId}
        getConnections={this.props.navigation.state.params.getConnections}
        navigation={this.props.navigation}
        getProfile={this.props.getProfile}
        userId={this.props.userId}/>
      </View>
    )
  }
}

//-------------------------------------------------------------//

export default class TrackScreen extends React.Component {

  static navigationOptions = {
    // Here we can change the title at the top of the page
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        isImage: true,

        // more here... except it all comes from props anyway

      },
      initialColor: 'white',
      finalColor: 'red',
    };
  }


  _handleOnPress = (event) => {
    this.setState((prevState) => {
      return {
        isImage: !prevState.isImage
      }
    });
  }

  componentDidMount() {
    
    // this.timer = 
    setInterval(()=> {
    const distanceTesting = this.props.screenProps.connectedFriendsDistances;
    const {isCloseColor, middleCloseColor, farAwayColor, closestDistance, middleDistance, user } = this.props.navigation.state.params;
      let userDistance = 0;
      if(distanceTesting[0]){
        distanceTesting.forEach((user) => {
          if(user.userId == this.props.navigation.state.params.user.id) {
            userDistance = user.distance
          }
        })
        if(userDistance <= closestDistance) {
          this.setState({
            finalColor: isCloseColor,
          })
        }
    
        if (userDistance <= middleDistance && userDistance > closestDistance) {
          this.setState({
            finalColor:middleCloseColor
          })
        }
    
        if(userDistance > middleDistance) {
          this.setState({            
            finalColor:farAwayColor
          })
        }
      }
    
    },3000)

  }

  componentWillUnmount() {
    setTimeout(()=> {})
    clearInterval(this.timer)
    //this removes the setState error orange yellow BUT, causes issues with 
  }

  render() {

    const {isCloseColor, middleCloseColor, farAwayColor, closestDistance, middleDistance, user } = this.props.navigation.state.params;
    const connection = this.props.navigation.state.params.user;

    return (
  
        <View style={styles.page}>
          <Text style={{fontWeight: 'bold'}}>
              { connection.first_name }
          </Text>

          <PulseLocation 
          isCloseColor = {isCloseColor} middleCloseColor={middleCloseColor} farAwayColor = {farAwayColor}
          distance = {this.props.navigation.state.params.distance}
          closestDistance = {closestDistance}
          middleDistance = {middleDistance}
          testing = {this.props.screenProps.connectedFriendsDistances}
          userId = {user.id}
          />

          <TouchableOpacity onPress={this._handleOnPress}>
          {
            this.state.isImage ?
            <QrCode
            getProfile={this.props.screenProps.getProfile}
            currentUserId={this.props.screenProps.currentUserId}
            getConnections={this.props.navigation.state.params.getConnections}
            navigation={this.props.navigation}
            connection={connection.connection_id}
            userId={connection.id}/>
            :
            <ProfileImage
            style={styles.trackImage}
            Image={connection.profile_picture}/>
          }
          </TouchableOpacity>

        </View>

    );
  }
}

const styles = StyleSheet.create({

  page: {
    flex: 1,
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackImage: {
    margin: 9,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  qr: {
    borderRadius: 5,
  },
  instruction: {
    fontWeight: 'bold',
    alignSelf: 'center'
  },


});

import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Button, Animated} from 'react-native';
import QRCode from 'react-native-qrcode';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner, Permissions } from 'expo';
import Barcode from '../screens/BarCode';
import { Container, Content, Badge} from 'native-base';

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
    // console.log("connection string", typeof(qrConnectionString))

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
        <Barcode currentUserId={this.props.currentUserId} getConnections={this.props.navigation.state.params.getConnections} navigation={this.props.navigation} userId={this.props.userId}/>
      </View>
    )
  }
}

//-------------------------------------------------------------//

export default class TrackScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        
        isImage: true,

        // more here... except it all comes from props anyway

      },
      distance: 50,
      initialColor: 'white',
      finalColor: 'red'
    };
  }

  _handleOnPress = (event) => {
    this.setState((prevState) => {
      return {
        isImage: !prevState.isImage
      }
    });
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.mounted = true;
    Animated.loop(
      Animated.spring(this.animatedValue,  {
        toValue: 1500,
        duration: 5000,
      })
    ).start()
    
    setInterval(()=> {
    const distanceTesting = this.props.screenProps.connectedFriendsDistances;
    const {isCloseColor, middleCloseColor, farAwayColor, closestDistance, middleDistance, user } = this.props.navigation.state.params;

    const { distance } = this.state

    
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
    this.state = false;
  }

  render() {

    const interpolateColor = this.animatedValue.interpolate({
      inputRange: [0, 5000],
      outputRange: [ this.state.initialColor, this.state.finalColor]
    })

    //FIXME: Colors do not change when their location is changed

    const animatedStyle = {
      backgroundColor: interpolateColor
    }

    const connection = this.props.navigation.state.params.user;

    return (
      <Animated.View style={[styles.page, animatedStyle]}>
        <View style={styles.page}>

          <Text style={{fontWeight: 'bold'}}>
              { connection.first_name }
              { connection.connection_id}
          </Text>

          <TouchableOpacity onPress={this._handleOnPress}>
          {
            this.state.isImage ? <QrCode currentUserId={this.props.screenProps.currentUserId} getConnections={this.props.navigation.state.params.getConnections} navigation={this.props.navigation} connection={connection.connection_id} userId={connection.id}/> : <ProfileImage style={styles.trackImage} Image={connection.profile_picture}/>
          }
          </TouchableOpacity>

        </View>

      </Animated.View>

    );
  }
}

const styles = StyleSheet.create({

  page: {
    flex: 1,
    borderRadius: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackImage: {
    margin: 9,
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  qr: {
    borderRadius: 5,
  },
  instruction: {
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  trackScreen: {

  }

});

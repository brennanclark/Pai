import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Button, Animated} from 'react-native';
import QRCode from 'react-native-qrcode';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner, Permissions } from 'expo';
import Barcode from '../screens/BarCode';
import { Container, Content, Badge} from 'native-base';
import Pulse from 'react-native-pulse';


class TESTING extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentColor: 'grey'
    }
  }


  componentWillReceiveProps() {
    setInterval(()=> {
      const {testing, isCloseColor, middleCloseColor, farAwayColor, closestDistance, middleDistance, userId } = this.props
        let userDistance = 0;
  
        if(testing[0]){
          testing.forEach((user) => {
            if(user.userId == userId) {
              userDistance = user.distance
            }
          })
          if(userDistance <= closestDistance) {
            console.log("CLOSEST")
            this.setState({
              currentColor: isCloseColor,
            })
          }
      
          if (userDistance <= middleDistance && userDistance > closestDistance) {
            console.log(("middle away"))
            this.setState({
              currentColor:middleCloseColor
            })
          }
      
          if(userDistance > middleDistance) {
            console.log("further away")
            this.setState({
              currentColor:farAwayColor
            })
          }
        }
      
      },3000)
  }
  componentDidMount() {

   
  }

  render() {
    console.log(this.state.currentColor)

    return (
      
        <Pulse color={this.state.currentColor} numPulses={3} diameter={600} speed={10} duration={2000} />
    
    )
  }
}

// function ShowPulse(props) {  

//   // console.log(props)
//   let distance = props.testing;
//   let userDistance = 0;
//   const {isCloseColor,middleCloseColor,farAwayColor, closestDistance, middleDistance} = props
//   distance.forEach((user) => {
    
//     // console.log(distance);
//       if(distance <= closestDistance) {
//         return <Pulse color={isCloseColor} numPulses={3} diameter={600} speed={10} duration={2000} />
//       }
  
//       if (distance <= middleDistance && distance > closestDistance) {
//         return <Pulse color={middleCloseColor} numPulses={3} diameter={600} speed={10} duration={2000} />
//       }
    
//       if(distance > middleDistance) {
//         return <Pulse color={farAwayColor} numPulses={3} diameter={600} speed={10} duration={2000} />
//       }
//   })

//   return ( 
//     <React.Fragment>
//       {isClose(distance)}
//       {middleClose(distance)}
//       {farAway(distance)}
//     </React.Fragment>
    
//   )
// }

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

    const {isCloseColor, middleCloseColor, farAwayColor, closestDistance, middleDistance, user } = this.props.navigation.state.params;

    

    const connection = this.props.navigation.state.params.user;

    return (
      // <Animated.View style={[styles.page, animatedStyle]}>
        <View style={styles.page}>

          <Text style={{fontWeight: 'bold'}}>
              { connection.first_name }
              { connection.connection_id}
          </Text>


          {/* <Pulse color={isCloseColor} numPulses={3} diameter={400} speed={20} duration={2000} /> */}
          
          <TESTING 
          isCloseColor = {isCloseColor} middleCloseColor={middleCloseColor} farAwayColor = {farAwayColor}
          distance = {this.props.navigation.state.params.distance}
          closestDistance = {closestDistance}
          middleDistance = {middleDistance}
          testing = {this.props.screenProps.connectedFriendsDistances}
          userId = {user.id}
          />

          <TouchableOpacity onPress={this._handleOnPress}>
          {
            this.state.isImage ? <QrCode currentUserId={this.props.screenProps.currentUserId} getConnections={this.props.navigation.state.params.getConnections} navigation={this.props.navigation} connection={connection.connection_id} userId={connection.id}/> : <ProfileImage style={styles.trackImage} Image={connection.profile_picture}/>
          }
          </TouchableOpacity>

        </View>

      // </Animated.View>

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

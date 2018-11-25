import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Button} from 'react-native';
import QRCode from 'react-native-qrcode';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner, Permissions } from 'expo';
import Barcode from '../screens/BarCode';



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
    if(this.state.isBarCode) {
    return (
    <View>
      <View style={styles.qr}>
        <QRCode
          value= '1'
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
        <Barcode navigation={this.props.navigation} />
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
        distance: 50,
        isImage: true,
        // more here... except it all comes from props anyway
      },
    };
  }
  _handleOnPress = (event) => {
    this.setState((prevState) => {
      return {
        isImage: !prevState.isImage
      }
    });
  }

  render() {
    const connection = this.props.navigation.state.params.user;
    return (
      <View style={styles.page}>
      <Text style={{fontWeight: 'bold'}}>
          { connection.first_name }
       </Text>
      <TouchableOpacity onPress={this._handleOnPress}>
      {
        this.state.isImage ? <QrCode navigation={this.props.navigation}/> : <ProfileImage style={styles.trackImage} Image={connection.profile_picture}/>
      }
      </TouchableOpacity>

     </View>
    );
  }
}

const styles = StyleSheet.create({

  page: {
    flex: 1,
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
  }

});

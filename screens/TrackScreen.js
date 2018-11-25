import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Button} from 'react-native';
import QRCode from 'react-native-qrcode';
import { Icon } from 'react-native-elements';
import { BarCodeScanner, Permissions } from 'expo';
import Barcode from '../screens/BarCode';
import { Container, Content, Badge} from 'native-base';




function ProfileImage(props) {
  return (
    <View>
      <Image style={styles.trackImage} source={{uri: props.Image}} />
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
      <QRCode
          value= '1'
          size={200}
          bgColor='purple'
          fgColor='white'/>
          <TouchableOpacity style={styles.captureBtn} onPress={this.takePicture}>
            <Button
            onPress={this._onPress}
            title='Scan'
            />
          </TouchableOpacity>
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

export default class TrackScreen extends React.Component {
  static navigationOptions = {
    // Here we can change the title at the top of the page
    title: 'track',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'nonsense',
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
    const connection = this.props.navigation.state.params.user.connection_id;
    return (
      <View style={styles.page}>
      <TouchableOpacity onPress={this._handleOnPress}>
      {
        this.state.isImage ? <QrCode navigation={this.props.navigation}/> : <ProfileImage style={styles.trackImage} Image={this.props.navigation.state.params.user.profile_picture}/>
      }
      </TouchableOpacity>
       <Text>
          {this.props.navigation.state.params.user.connection_id}
          { this.props.navigation.state.params.user.first_name }
       </Text>
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
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  iconCamera: {

  },
  captureBtn: {
    backgroundColor: 'grey'
  }
});

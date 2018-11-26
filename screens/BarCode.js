import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Button} from 'react-native';
import QRCode from 'react-native-qrcode';
import app from '../styles/container.js';
import { Icon } from 'react-native-elements';
import { BarCodeScanner, Permissions } from 'expo';
import { createStackNavigator } from 'react-navigation';
import axios from 'react-native-axios';
const {ipv4} = require('../config.json');
// const{ width} = Dimensions.get('window');



export default class Barcode extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    // Here we can change the title at the top of the page
    title: 'BarCode',
  };

  state = {
    hasCameraPermission: null,
    type: BarCodeScanner.Constants.Type.back,
  };

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState ({ hasCameraPermission: (status === 'granted')});
  }

  handleBarCodeScanned (data) {
    axios.post(`${ipv4}/connections/${data}/friends`)
    .then(() => {
      console.log(data)
      //this.props.navigation.navigate('Links');
      this.props.navigation.navigate('Links');
    })
    .catch(err => console.warn(err))
    alert("CONGRATULATIONS!!! you are now friends");
  }

  render() {

    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text> Requesting permission to use Camera </Text>;
    }
    if (hasCameraPermission === false) {
      return <Text> No access to camera</Text>;
    }
    return (
      <View style={{  width: 300, height: 300}}>
        <BarCodeScanner
          onBarCodeScanned={(scan) => this.handleBarCodeScanned(scan.data)}
          barCodeTypes={[
            BarCodeScanner.Constants.BarCodeType.qr,
            BarCodeScanner.Constants.BarCodeType.pdf417,
          ]}
          type={this.state.type}
          style={{ ...StyleSheet.absoluteFill}}
          />
        <TouchableOpacity
          style={{
            flex: 0.5,
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => this.setState({ type:
            this.state.type === BarCodeScanner.Constants.Type.back
              ? BarCodeScanner.Constants.Type.front
              : BarCodeScanner.Constants.Type.back,
          })}
        >
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
});

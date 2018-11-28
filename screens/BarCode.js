import React from 'react';
import { AlertIOS, Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import axios from 'react-native-axios';
const {ipv4} = require('../config.json');
// import DropdownAlert from 'react-native-dropdownalert';

// import FlashMessage from "react-native-flash-message";


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

  handleBarCodeScanned (conn_id) {
    axios({
      method: 'post',
      url: `${ipv4}/connections/${conn_id}/friends`,
      data: {
        userId: this.props.userId,
      }
    })
      .then((res) => {
        this.props.navigation.state.params.getConnections(this.props.currentUserId);
        this.props.navigation.state.params.getProfile(this.props.currentUserId);
        setTimeout(() =>{
        this.props.navigation.navigate('Links');
      },1000);

      })
      .catch((err) => console.warn(err))
      AlertIOS.alert("CONGRATULATIONS!!! you are now friends");
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
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent'
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

import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Button} from 'react-native';
import QRCode from 'react-native-qrcode';
import { Icon } from 'react-native-elements';
import { BarCodeScanner, Permissions } from 'expo';


 class Barcode extends React.Component {
  state = {
    hasCameraPermission: null,
    type: BarCodeScanner.Constants.Type.back,
  };

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState ({ hasCameraPermission: (status === 'granted')});
  }

  handleBarCodeScanned = ({ type, data }) => {
    alert("Bar code scanned");
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
          onBarCodeScanned={data => alert("You are friends now")}
          barCodeTypes={[
            BarCodeScanner.Constants.BarCodeType.qr,
            BarCodeScanner.Constants.BarCodeType.pdf417,
          ]}
          type={this.state.type}
          style={{ ...StyleSheet.absoluteFillObject }}
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
    console.log("Scan pressed");
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
          value="somestring"
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
        <Barcode/>
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
    return (
      <View style={styles.page}>
      <TouchableOpacity onPress={this._handleOnPress}>
      {
        this.state.isImage ? <QrCode/> : <ProfileImage style={styles.trackImage} Image={this.props.navigation.state.params.user.profile_picture}/>

      }
      </TouchableOpacity>
       <Text>
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

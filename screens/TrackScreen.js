import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode';


function ProfileImage(props) {
  return (
    <View>
      <Image style={styles.trackImage} source={{uri: props.Image}} />
    </View>
  )
}

function QrCode(props) {
  return (
    <View>
      <QRCode
          value="somestring"
          size={200}
          bgColor='purple'
          fgColor='white'/>
    </View>
  )
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
});

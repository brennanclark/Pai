import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode';


function ProfileImage(props) {
  return (
    <View>
      <Image style={styles.connectionImage} source={{uri: props.Image}} />
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
    title: 'Attack!!!',
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
      <View style={styles.container2}>
      <TouchableOpacity onPress={this._handleOnPress}>
      {
        this.state.isImage ? <QrCode/> : <ProfileImage style={styles.connectionImage} Image={this.props.navigation.state.params.user.profile_picture}/>

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
  container1: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'white',
  },
  container2: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#f4c542',
  },
  connectionImage: {
    margin: 9,
    height: 80,
    width: 80,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1
  },
});

import React from 'react';
import { Text, TextInput, StyleSheet, View, Image, TouchableOpacity } from 'react-native';




export default class LoginScreen extends React.Component {
  static navigationOptions = {
    // Here we can change the title at the top of the page
    title: 'Login',
  };

  constructor(props) {
    super(props);

  }

  // onPress(event){
  //   console.log("ouch");
  //   console.log(this.props.navigation)
  //   this.props.navigation.navigate('Profile');
  // }


  render() {

    return (
      <View style={styles.page}>
      <Text style={styles.animatedLogo}> mamihlapinatapai </Text>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile')}>
          <Image
            source={{uri: 'https://mbtskoudsalg.com/images/login-with-facebook-button-png-1.png'}}
            style={styles.fblogin}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  animatedLogo: {
    fontSize: 40,
  },
  fblogin: {
    height: 150,
    width: 300,
  },
});

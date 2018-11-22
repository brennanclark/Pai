import React from 'react';
import { Text, StyleSheet, View, Image} from 'react-native';


export default class TrackScreen extends React.Component {
  static navigationOptions = {
    // Here we can change the title at the top of the page
    header: null,
  };

  constructor(props) {
    super(props);
    this.fake_props = {
      user: {
        name: 'nonsense',
        // more here... except it all comes from props anyway
      },
    };
  }

  render() {
    console.log("Navigation params",this.props.navigation.state.params.user);
    return (
      <View style={styles.page}>
      <Image style={styles.trackImage} source={{uri: this.props.navigation.state.params.user.profile_picture}}/>
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

import React from 'react';
import { Text, StyleSheet, View, Image} from 'react-native';

export default class TrackScreen extends React.Component {
  static navigationOptions = {
    // Here we can change the title at the top of the page
    title: 'Attack!!!',
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
      <View style={styles.container}>
      <Image style={styles.connectionImage} source={{uri: this.props.navigation.state.params.user.profile_picture}}/>
       <Text>

          { this.props.navigation.state.params.user.first_name }
       </Text>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#c8e1f2',
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

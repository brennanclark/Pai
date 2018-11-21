import React from 'react';
import { Text, StyleSheet, View, Image} from 'react-native';

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
        // more here... except it all comes from props anyway
      },
    };
  }

  render() {
    console.log("Navigation params",this.props.navigation.state.params.user);
    return (
      <View style={styles.container2}>
      <Image style={styles.connectionImage} source={{uri: this.props.navigation.state.params.user.profile_picture}}/>
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

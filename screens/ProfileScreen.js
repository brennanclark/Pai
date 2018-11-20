import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ListView,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'react-native-axios';
const {ipv4} = require('../config.json');

import { MonoText } from '../components/StyledText';
var Users = require('../HardCodedData.json');

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    //List view is depracated look into doing something different here
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      user: Users,
      dataSource: ds.cloneWithRows(Users[0].nuggets)
    }
    this.getUsers = this.getUsers.bind(this);
  }


  getUsers() {
    axios.get(`${ipv4}/user/1/connections`)
    .then((response)=> {
      console.log(response.data);
    })
  }


  renderRow(data) {
    return (
      <View style={styles.nugget}>
        <Text>Q:{data.question}</Text>
        <Text>A:{data.answer}</Text>
      </View>
    );
  }

  findLoggedInUser(){
    if(this.state.user)
    return
  }

  render() {


    return (

      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>



          <Image source={{uri: this.state.user[0].profile_picture}} style ={styles.profileImage}/>
          <Text style={styles.profileName}>{this.state.user[0].firstName}</Text>
          <Text style={styles.friendCounter}>Friends</Text>
          <Text style={styles.friendCounter}>10</Text>
          <Text style={styles.title}>Nuggets</Text>

          <Button
            onPress={this.getUsers}
            title="Learn More"
            color="#841584"
          />


          <ListView
            style={styles.nuggetContainer}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </ScrollView>

      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  profileName: {
    fontSize: 50,
    textAlign: 'center',
  },

  profileImage: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginLeft: 90,
    borderRadius: 50,
  },

  title: {
    fontSize:30,
    textAlign: 'center',
    margin: 10,
  },

  nuggetContainer: {
    padding: 20,
  },

  nuggetPicture: {
    width:50,
    height:50,
    borderRadius: 5,
  },

  nugget: {
    padding: 5,
  },

  friendCounter: {
    textAlign: 'left',
  },

})
  // already created content

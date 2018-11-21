import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'react-native-axios';
import {ipv4} from '../config.json'

const Nugget = ({
  question,
  answer,
}) => (
  <View style={styles.nuggetContainer}>
    <Text style={styles.nugget}>{ question }</Text>
    <Text style={styles.nugget}>{ answer }</Text>
  </View>
)

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    //List view is depracated look into doing something different here
    this.state = {
      user: null,
      currentUserId: 1,
      profileImage : " ",
      nuggets: [],
    }
    this.getProfileInformation = this.getProfileInformation.bind(this);

  }

  componentDidMount() {
    this.getProfileInformation();
  }

  sendLocationToServer() {
  }

  getProfileInformation() {
    axios.get(`${ipv4}/user/${this.state.currentUserId}`)
    .then((response)=> {
      const data = response.data
      this.setState({
        user: data.first_name,
        profileImage: data.profile_picture,
        nuggets: data.nuggets,
      })
    })
  }

  render() {

    return (

      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <Image source={{uri: this.state.profileImage}} style ={styles.profileImage}/>
          <Text style={styles.profileName}>{this.state.user}</Text>
          <Text style={styles.friendCounter}>Friends</Text>
          <Text style={styles.friendCounter}>10</Text>

          <Text style={styles.title}>Nuggets</Text>

        <Button
        onPress={()=>{
          this.setState({
            currentUserId:1,
          }, this.getProfileInformation)
        }}
        title="User 1"
        color="blue"
        />

       <Button
        onPress={()=>{
          this.setState({
            currentUserId:2,
          }, this.getProfileInformation)
        }}
        title="User 2"
        color="blue"
        />

      <Button
        onPress={()=>{
          this.setState({
            currentUserId:3,
          }, this.getProfileInformation)
        }}
        title="User 3"
        color="blue"
        />

              <Button
        onPress={()=>{
          this.setState({
            currentUserId:4,
          }, this.getProfileInformation)
        }}
        title="User 4"
        color="blue"
        />

          <FlatList
            data={this.state.nuggets}
            renderItem={({item}) => <Nugget { ...item }/>}
            keyExtractor={(item, index) => index.toString()}
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

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

})
  // already created content

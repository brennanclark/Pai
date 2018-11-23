import React from 'react';
import app from '../styles/container.js';
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

import { WebBrowser, Permissions, Location } from 'expo';
import axios from 'react-native-axios';
import {ipv4} from '../config.json'
import QRCode from 'react-native-qrcode';

const Nugget = ({
  question,
  answer,
}) => (
  <View style={styles.nuggetContainer}>
    <Text style={styles.nugget}>{ question }</Text>
    <Text style={styles.nugget}>{ answer }</Text>
  </View>
)

function ProfileImage(props) {
  return (
    <View>
      <Image source={{uri: props.Image}} style={styles.profileImage}/>
    </View>
  )
}

function QrCode(props) {
  return (
    <View style={styles.profileImage}>
    <QRCode
        value="somestring"
        size={200}
        bgColor='purple'
        fgColor='white'/>
    </View>
  )
}

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity onPress={this._handleOnPress}>
          {
            this.props.screenProps.profileImage ? <ProfileImage Image={ this.props.screenProps.profileImage  }/> : <QrCode/>
          }
          </TouchableOpacity>
          <Text style={styles.profileName}>{this.props.screenProps.user}</Text>
          <Text style={styles.friendCounter}>Friends</Text>
          <Text style={styles.friendCounter}>10</Text>

          <Text style={styles.title}>Nuggets</Text>
          <Text style={styles.friendCounter}>Distance: {this.props.screenProps.distance}</Text>
          
          <Button 
          onPress= {this.props.screenProps.findConnection}
          title = "find match"
          color = "purple"/>
        


        <Text style={styles.title}>Nuggets</Text>

          <FlatList
            data={this.props.screenProps.nuggets}
            renderItem={({item}) => <Nugget { ...item }/>}
            keyExtractor={(item, index) => index.toString()}
            style={styles.info}
        />

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  profileImage: {
    width: 175,
    height: 175,
    alignSelf: 'center',
    borderRadius: 10,
  },

  profileName: {
    fontSize: 50,
    textAlign: 'center',
    margin: 5,
  },

  friendCounter: {
    textAlign: 'left',
  },

  title: {
    fontSize:30,
    textAlign: 'center',
  },

  nugget: {
    padding: 5,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },


})
  // already created content

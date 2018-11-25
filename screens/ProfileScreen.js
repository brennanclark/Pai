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
import { Badge } from 'react-native-elements';
import { Container, Content, Footer} from 'native-base';



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
        value= {props.currentId}
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

  constructor(props) {
    super(props);
    this.state = {
      isImage: true,
    }
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
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity onPress={this._handleOnPress}>
          {
            this.state.isImage ? <ProfileImage Image={ this.props.screenProps.profileImage  }/> : <QrCode currentId={this.props.screenProps.currentUserId} testProp={this.props.navigation}/>
          }
          </TouchableOpacity>
          <Text style={styles.profileName}>{this.props.screenProps.user}</Text>
          <Text style={styles.friendCounter}></Text>
          <Text style={styles.friendCounter}>Friends: {this.props.screenProps.friends}</Text>
          <Badge
            value={this.props.screenProps.friends}
            textStyle={{ color: 'orange' }}
            containerStyle={{backgroundColor: 'green'}, {width: '8%'}}
          />

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

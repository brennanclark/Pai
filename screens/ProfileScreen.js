import React from 'react';
import app from '../styles/container.js';
import { Badge, Icon } from 'react-native-elements';
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
  ImageBackground,
} from 'react-native';
import { WebBrowser, Permissions, Location } from 'expo';
import axios from 'react-native-axios';
import QRCode from 'react-native-qrcode';
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
    // console.log("Screen props friends", this.props.screenProps.friends);

    return (

      <View style={app.profileContainer}>
        <ScrollView>

          <ProfileImage Image={ this.props.screenProps.profileImage  }/>

          <View style={{flexDirection: 'row', justifyConent: 'space-between'}}>
            <Text style={styles.profileName}>{this.props.screenProps.user}</Text>

              <View style={styles.friendCounter}>

                <Badge
                textStyle={{ color: 'orange' }}
                >

                <Icon
                type='simple-line-icon'
                name='badge'
                size= {25}
                color= 'gold'
                />

                  <Text style={{color: 'gold'}}>{this.props.screenProps.friends} Friends</Text>

                </Badge>

              </View>
          </View>

          <View style={styles.hline}/>

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
    width: 347,
    height: 347,
    alignSelf: 'center',
    marginBottom: 10,
  },

  profileName: {
    fontSize: 50,
    alignSelf: 'center',
    flex: 4,
  },
  friendCounter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },

  hline: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 5,
  },

  title: {
    marginTop: 10,
    textAlign: 'center',
    fontSize:30,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },


})
  // already created content

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
    <Text style={styles.question}>{ question }</Text>
    <Text style={styles.answer}>{ answer }</Text>
  </View>
)

function Header(props) {
  return (
    <View style={styles.header}>
      <Icon
      type='simple-line-icon'
      name='logout'
      size= {25}
      color= 'pink'
      onPress={()=> props.Nav.navigate('Login')}
      />
      <Text style={styles.headerText}> Profile </Text>
      <Icon
      type='simple-line-icon'
      name='settings'
      size= {30}
      color= 'pink'
      />
    </View>
  )
}


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

  render(props) {
    // console.log("Login screen", this.props.screenProps.getProfile);

    return (

        <ImageBackground
        source={require('../assets/images/background1.png')}
        style={[app.profileContainer, {width: '100%', height: '100%'}]}
        >
        <Header Nav={this.props.navigation} />

        <ScrollView
        showsVerticalScrollIndicator={false}>

          <ProfileImage Image={ this.props.screenProps.profileImage  }/>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>


              <Text style={styles.profileName}>{this.props.screenProps.user}</Text>

              <Badge
              containerStyle={{
                backgroundColor: 'transparent',
                marginTop: 10,
                marginRight: 5,
              }}
              >
                <Icon
                type='simple-line-icon'
                name='badge'
                size= {35}
                color= '#474747'
                />
                <Text style={{color: '#474747'}}>{this.props.screenProps.friends} Friends
                </Text>
              </Badge>

            </View>


          <FlatList
            data={this.props.screenProps.nuggets}
            renderItem={({item}) => <Nugget { ...item }/>}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },

  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#474747'

  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
  },

  profileName: {
    fontSize: 50,
    marginLeft: 10,
    alignSelf: 'center',
    color: '#474747',
  },

  friendBadge: {
    flexDirection: 'column',
    marginRight: 15,
    paddingTop: 5,
  },

  nuggetContainer: {
    borderRadius: 10,
    borderColor: '#474747',
    borderWidth: 1,
    marginTop: 10,
    margin: 5,
    padding: 5,
  },

  question: {
    color: '#474747',
    marginBottom: 5,
  },

  answer: {
    color: 'black',
    fontWeight: 'bold',
  },




})
  // already created content

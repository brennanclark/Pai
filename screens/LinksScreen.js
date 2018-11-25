import React from 'react';
import app from '../styles/container.js';
import axios from 'react-native-axios';
import { Alert, ScrollView, StyleSheet, View, ListItem, Text, Image, TouchableHighlight, TouchableOpacity, Button, ImageBackground, Animated } from 'react-native';
const {ipv4} = require('../config.json');
import { Badge, TouchableNative } from 'react-native-elements';
import moment from 'moment';
function CardOpen(props) {
  let nuggets = props.person.nuggets;
    return (
        <View style={styles.nuggets}>
          { nuggets.map((nugget, i) => (
          <View key={i}>
            <Text>Q:{nugget.question}</Text>
            <Text>A:{nugget.answer}</Text>
          </View>
            )) }
          <TouchableOpacity>
            <Button
            onPress={() => {props.deleteConnection(props.person.connection_id)} }
            title= 'Delete'
            />
          </TouchableOpacity>
        </View>
    )
}

class Card extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      // near: false,
    }
  }
  _onPress = (event) => {
    this.setState((prevState) => {
      return {
        open: !prevState.open
      }
    });
  }
  _onLongPress = (event) => {
    this.props.navigation.navigate('Track', { user: this.props.user, navigation: this.props.navigation});
  }



  changeBackGroundColorDependingOnTheDistance(distance) {

    let hex = 0;

    if(distance < 50) {


    } else if (distance < 100 && distance > 50) {

    }
    else {

    }
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 150,
      duration: 1500
    }).start();
  }

  render() {

    const interpoloateColor = this.animatedValue.interpolate({
      inputRange: [0,150],
      outputRange: ['rgb(0,0,0)', 'rgb(51,250,170)']
    })
    const animatedStyle = {
      background: interpoloateColor
    }
    console.log("WHAT IS THIS", animatedStyle)

    const { user = {} } = this.props;
    const { first_name, profile_picture, number_of_friends} = user;
    let connectedAt = user.connected_at;
    let expiryAt = (moment(connectedAt).add(7,'days').format('YYYYMMDD'));
    let daysRemaining = moment(expiryAt).fromNow();
    let distanceOfEachUser = this.props.distance(this.props.screenProps.connectedFriendsDistances, user.id)

    return (
      <TouchableOpacity underLayColor="white" onPress={this._onPress} onLongPress={this._onLongPress}>
      
        <View style={styles.cardClosed, this.state.open ? styles.cardOpen : null}>
          <View style={styles.header}>
          
            <Image style={styles.connectionImage} source={{uri: profile_picture}}/>
            <Animated.View style={[styles.box, animatedStyle]}>
            <Text style={styles.name}> {first_name} </Text>
            </Animated.View>
            <Text>Distance: {this.props.distance(this.props.screenProps.connectedFriendsDistances, user.id)}</Text>
            
          </View>
              {
              this.state.open ? <CardOpen deleteConnection={this.props.deleteConnection} person={ user } /> : null
              }
              <Animated.View style={[styles.testing, animatedStyle]}/>
            
                <Text style={styles.expiry}> Expiring {daysRemaining} </Text>
              
        </View>
        
      </TouchableOpacity>
    ) //this is a Lint error, but everything works;
  }
}
//---------------------------------------------------------------------------------------------------------------------------------//
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props)
    this.state = {
      userConnections: [],
      currentUserId: this.props.screenProps.currentUserId,
      // deleted: false,
      isNear: false,
    }
    this.deleteConnection = this.deleteConnection.bind(this);
    this.distanceFromSource = this.distanceFromSource.bind(this);
  }



  componentDidMount() {
    axios.get(`${ipv4}/user/${this.props.screenProps.currentUserId}/connections`)
    .then((res) => {
      this.setState({ userConnections: res.data , currentUserId: this.props.screenProps.currentUserId})
    })
    .catch(err => console.warn(err))
  }
  deleteConnection(conn_id) {
    axios({
      method: 'post',
      url: `${ipv4}/connections/${this.state.currentUserId}/${conn_id}/delete`,
      data: {
        userId: this.state.currentUserId,
        currentConnectionId: conn_id,
      }
    })
      .then((res) => {
        this.setState({userConnections: res.data});
      })
      .catch((err) => console.warn(err))
  }
  distanceFromSource(arr, userId){
    let distance = 0;
    if(arr[0]) {
      arr.forEach((item) => {
        if(item.userId == userId) {
          distance = item.distance;
        }
      })
      return distance
    } 
  }
  // Need function with websocket data to update state of isNear above.
  render() {
    const { userConnections } = this.state;
    // Builds out a card for each connection
    return (
        <View style={app.linksContainer}>
          <ImageBackground
          source={require('../assets/images/background.png')}
          style={{width: '100%', height: '100%'}}
          >
            <ScrollView>
              { userConnections.map(
                (user, index) => <Card
                isNear={index % 2 === 0 /* Every other user for debug reasons */}
                deleteConnection={this.deleteConnection}
                user={ user }
                key={ user.id }
                distance={ this.distanceFromSource }
                {...this.props}
                />
              )}
            </ScrollView>
          </ImageBackground>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  testing: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
  },

  header: {
    flexDirection:'row',
  },
  cardClosed: {
    height: 100,
    width: 'auto',
    borderBottomColor: '#efefef',
    borderBottomWidth: 2,
  },
  cardOpen: {
    height: 'auto',
  },
  near: {
    // borderColor: 'gold',
    // borderWidth: 5,
    // borderStyle: 'solid',
  },
  connectionImage: {
    height: 98,
    width: 100,
    alignItems: 'center',
  },
  name: {
    lineHeight: 90,
    fontSize: 27,
  },
  expiry: {
    marginTop: -20,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'right',
    margin: 10,
  },
  nuggets: {
    flexDirection: 'column',
    textAlign: 'left',
    width: 'auto',
    margin: 10,
  },
});

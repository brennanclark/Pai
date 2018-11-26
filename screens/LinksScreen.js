import React from 'react';
import app from '../styles/container.js';
import axios from 'react-native-axios';
import { Alert, ScrollView, StyleSheet, View, Text, Image, TouchableHighlight, TouchableOpacity, Button, ImageBackground, Animated } from 'react-native';
const {ipv4} = require('../config.json');
import { Badge, TouchableNative, Icon } from 'react-native-elements';
import moment from 'moment';


function DistanceColor(props) {

  let distance = props.distance
  let closestDistance = 50;
  let middleDistance = 100;

  function isClose(distance) {
    if(distance <= closestDistance) {
      return <Icon 
              name='location-on'
              color="red"
              containerStyle={styles.locationIcon}
              size= {40}
            />
    }
  }

  function middleClose(distance) {
    if (distance <= middleDistance && distance > closestDistance) {
      return <Icon 
              name='location-on'
              color="blue"
              containerStyle={styles.locationIcon}
              size= {40}
            />
    }
  }

  function endingClass(distance) {
    if(distance > middleDistance) {
      return <Icon 
              name='location-on'
              color="green"
              containerStyle={styles.locationIcon}
              size= {40}
            />
    }
  }
 
  return ( 
    <View style = {{overflow:'hidden'}}>
      {isClose(distance)}
      {middleClose(distance)}
      {endingClass(distance)}
    </View>
    
  )

}

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

  render() {

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
            <Text style={styles.name}> {first_name} </Text>
            <Text>Distance: {this.props.distance(this.props.screenProps.connectedFriendsDistances, user.id)}</Text>
            <DistanceColor distance={this.props.distance(this.props.screenProps.connectedFriendsDistances, user.id)}/>
            
          </View>
              {
              this.state.open ? <CardOpen deleteConnection={this.props.deleteConnection} person={ user } /> : null
              }
          
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

  //testing code starts here

  closest: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 10,
    marginTop: 5,
  },

  inBetween: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 5,
    marginTop: 5,
  },

  further: {
    backgroundColor: 'grey',
    width: 50,
    height: 50,
    borderRadius: 5,
    marginTop: 5,
  }, 

  locationIcon: {
    margin: 20
    
  }
});
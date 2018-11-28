import React from 'react';
import app from '../styles/container.js';
import axios from 'react-native-axios';
import { AlertIOS, ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
const {ipv4} = require('../config.json');
import { Badge, Icon } from 'react-native-elements';
import moment from 'moment';

function DistanceColor(props) {
  let distance = props.distance
  const {isCloseColor,middleCloseColor,farAwayColor, closestDistance, middleDistance} = props

  function isClose(distance) {
    if(distance <= closestDistance) {
      return <Icon
              name='location-on'
              color={isCloseColor}
              size= {35}
              style = {styles.locationIcon}
            />
    }
  }
  function middleClose(distance) {
    if (distance <= middleDistance && distance > closestDistance) {
      return <Icon
              name='location-on'
              color={middleCloseColor}
              size= {35}
              style = {styles.locationIcon}
            />
    }
  }

  function farAway(distance) {
    if(distance > middleDistance) {
      return <Icon
              name='location-on'
              color={farAwayColor}
              size= {35}
              style = {styles.locationIcon}
            />
    }
  }
  return (
    <View style = {styles.locationIcon}>
      {isClose(distance)}
      {middleClose(distance)}
      {farAway(distance)}
    </View>
  )
}


function Header(props) {
  return (
    <View style={styles.header}>
      <Icon
      type='ionicon'
      name='ios-arrow-back'
      size= {30}
      color= 'pink'
      onPress={()=> props.Nav.navigate('Profile')}
      />
      <Text style={styles.headerText}> Connections </Text>
      <Icon
      type='feather'
      name='user-plus'
      size= {30}
      color= 'pink'
      onPress={props.connect}
      />
    </View>
  )
}

function CardOpen(props) {
  let nuggets = props.person.nuggets;
    return (
      <View>
        <Badge
          containerStyle={{
            backgroundColor: 'transparent',
            marginRight: 10,
          }}
          >
          <Icon
          type='simple-line-icon'
          name='badge'
          size= {35}
          color= '#474747'
          />
          <Text style={{color: '#474747', fontWeight: 'bold'}}>{props.friendsNum}
          </Text>
        </Badge>
        <View style={styles.nuggets}>
          { nuggets.map((nugget, i) => (
          <View style={styles.nuggetContainer} key={i}>
            <Text style={styles.question}>{nugget.question}</Text>
            <Text style={styles.answer}>{nugget.answer}</Text>
          </View>
            )) }
          <View style={styles.delete}>
            <Icon
            type='feather'
            name='user-x'
            onPress={() => {
                AlertIOS.prompt(
                  'Remove Connection',
                  `Are you sure you want to remove ${props.person.first_name} as a connection?`,
                  [
                    {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
                    {text: 'Yes', onPress: () => props.deleteConnection(props.person.connection_id)},
                  ],
                    { cancelable: false }
                  )
                //
              }}
            color='pink'
            backgroundColor='#474747'
            size={30}
            />
          </View>
        </View>
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
    this.props.navigation.navigate('Track',
    { user: this.props.user,
      navigation: this.props.navigation,
      getConnections: this.props.getConnections,
      getProfile: this.props.getProfile,
      isCloseColor : this.props.isCloseColor,
      middleCloseColor : this.props.middleCloseColor,
      farAwayColor : this.props.farAwayColor,
      distance: this.props.distance(this.props.screenProps.connectedFriendsDistances, this.props.user.id),
      closestDistance: this.props.closestDistance,
      middleDistance: this.props.middleDistance
    });
  }
  render() {
    const { user = {}, isCloseColor, middleCloseColor, farAwayColor, closestDistance, middleDistance } = this.props;
    const { first_name, profile_picture, number_of_friends} = user;
    let friendsTotal = number_of_friends;
    // console.log("Friends", friendsTotal);
    let connectedAt = user.connected_at;
    let expiryAt = (moment(connectedAt).add(7,'days').format('YYYYMMDD'));
    let daysRemaining = moment(expiryAt).fromNow();
    return (
      <TouchableOpacity
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#918f8f',
        }}
        underLayColor="white" onPress={this._onPress} onLongPress={this._onLongPress}>
        <View style={styles.cardClosed, this.state.open ? styles.cardOpen : null}>
        <View style={styles.cardFlow}>

          <View style={styles.imgAndName}>
            <Image style={styles.connectionImage} source={{uri: profile_picture}}/>
            <Text style={styles.name}> {first_name} </Text>
          </View>

          <View style={styles.icons}>
            <DistanceColor
            distance={this.props.distance(this.props.screenProps.connectedFriendsDistances, user.id)}
            isCloseColor = {isCloseColor}
            middleCloseColor = {middleCloseColor}
            farAwayColor = {farAwayColor}
            closestDistance = {closestDistance}
            middleDistance = {middleDistance}
            userId = {user.id}

            />

          </View>

        </View>

            {
            this.state.open ? <CardOpen friendsNum={this.props.screenProps.friends} deleteConnection={this.props.deleteConnection} person={ user } /> : null
            }
            <Text style={styles.expiry}> Expiring {daysRemaining} </Text>
          </View>
      </TouchableOpacity>
    )
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
    this.getConnections = this.getConnections.bind(this);
    this.addConnection = this.addConnection.bind(this);
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
      url: `${ipv4}/connections/${conn_id}/delete`,
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

  addConnection(){
    axios({
      method: 'post',
      url: `${ipv4}/user/${this.props.screenProps.currentUserId}/connections/new`,
    })
    .then((res) => {
      this.setState({userConnections: res.data}, this.getConnections);
    })
    .catch((err) => console.log.warn(err))
  }

  getConnections() {
    axios.get(`${ipv4}/user/${this.props.screenProps.currentUserId}/connections`)
    .then((res) => {
      this.setState({ userConnections: res.data , currentUserId: this.props.screenProps.currentUserId})
    })
    .catch(err => console.warn(err))
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
    } else {
      return null;
    }
  }
  // Need function with websocket data to update state of isNear above.
  render() {
    const { userConnections } = this.state;
    // Builds out a card for each connection
    return (
          <ImageBackground
          source={require('../assets/images/background.png')}
          style={[ {width: '100%', height: '100%'}, app.linksContainer ]}
          >
            <Header Nav={ this.props.navigation } connect={this.addConnection}/>
            <ScrollView
            style={{paddingTop: 10}}
            showsHorizontalScrollIndicator={false}>
              { userConnections.map(
                (user, index) => <Card
                isNear={index % 2 === 0 /* Every other user for debug reasons */}
                deleteConnection={this.deleteConnection}
                getConnections={this.getConnections}
                user={ user }
                key={ user.id }
                distance={ this.distanceFromSource }
                getProfile={this.props.screenProps.getProfile}
                {...this.props}
                isCloseColor = "#e54b4b"
                middleCloseColor = "#e0a3f7"
                farAwayColor = "#4b64e5"
                closestDistance = '5'
                middleDistance = '10'

                />
              )}
            </ScrollView>
          </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingLeft: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#474747'
  },
  cardFlow: {
    // marginTop: -5,
    flexDirection:'row',
    justifyContent: 'space-between',
    margin: 0
  },
  cardClosed: {
    height: 100,
    width: 'auto',
  },
  cardOpen: {
    height: 'auto',

  },
  imgAndName: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  connectionImage: {
    height: 98,
    width: 100,
    alignItems: 'center',
  },
  name: {
    lineHeight: 90,
    fontSize: 27,
    color: '#474747',
    alignSelf: 'flex-start',
  },
  expiry: {
    marginTop: -17,
    fontStyle: 'italic',
    textAlign: 'right',
    paddingRight: 10,
    color: '#474747',
  },
  nuggets: {
    flexDirection: 'column',
    textAlign: 'left',
    width: 'auto',
    margin: 10,
  },
  nuggetContainer: {
    borderRadius: 10,
    borderColor: '#474747',
    borderWidth: 1,
    marginTop: 5,
    margin: 5,
    padding: 5,
  },
  locationIcon: {
    marginTop: 30,
    marginRight: 30,
  },
  question: {
    color: '#474747',
    marginBottom: 5,
  },
  answer: {
    color: 'black',
    fontWeight: 'bold',
  },
  delete: {
    width: 35,
    height: 35,
    alignSelf: 'center',
  },
});

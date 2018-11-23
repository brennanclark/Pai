import React from 'react';
import app from '../styles/container.js';
import axios from 'react-native-axios';
import { Alert, ScrollView, StyleSheet, View, ListItem, Text, Image, TouchableHighlight, TouchableOpacity, Button } from 'react-native';
const {ipv4} = require('../config.json');
var Users = require('../HardCodedData.json');
var Connections = require('../Connection.json');
import moment from 'moment';


function CardOpen(props) {
  let nuggets = props.person.nuggets;

    return (
        <View style={styles.nuggets}>
          {
           nuggets.map((nugget, i) => (
             <View key={i}>
              <Text>Q:{nugget.question}</Text>
              <Text>A:{nugget.answer}</Text>
             </View>
            )
            )
          }
        </View>
    )
}

class Card extends React.Component {
  state = {
    open: false,
    nuggets: Users.nuggets,
    currentUserId: 1
  }

  _onPress = (event) => {
    this.setState((prevState) => {
      return {
        open: !prevState.open
      }
    });
  }
  _onLongPress = (event) => {
    this.props.navigation.navigate('Track', { user: this.props.user });
  }

  render() {
    const { user = {} } = this.props
    const { first_name, profile_picture } = user;
    let connectedAt = user.connected_at;
    let expiryAt = (moment(connectedAt).add(7,'days').format('YYYYMMDD'));
    let daysRemaining = moment(expiryAt).fromNow();

    return (

      <TouchableOpacity underLayColor="white" onPress={this._onPress} onLongPress={this._onLongPress}>

        <View style={[styles.cardClosed, this.state.open ? styles.cardOpen : null]}>

        <View style={styles.header}>
          <Image style={styles.connectionImage} source={{uri: profile_picture}}/>
          <Text style={styles.name}> {user.first_name} </Text>
        </View>
            {
            this.state.open ? <CardOpen  person={ user } /> : null
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
      users: [],
      connections: Connections
    }
    // this.findUserByIdFromConnections= this.findUserByIdFromConnections.bind(this);
  }

  componentDidMount() {
    axios.get(`${ipv4}/user/1/connections`)
    .then((res) => {
      this.setState({ users: res.data })
    })
    .catch(err => console.warn(err))
  }

  render() {

    const { users } = this.state;
    return (

      <View style={app.container}>
        <ScrollView>
          { users.map((user, index) => <Card user={ user } key={index} {...this.props}/>)}
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({

  header: {
    flexDirection:'row',
  },

  cardClosed: {
    height: 100,
    width: 330,
    margin: 7,
    backgroundColor: 'lightsteelblue',
    borderRadius: 10,
    shadowOffset: {
    width: 2,
    height: 2,
    },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    opacity: 0.95,

  },
  cardOpen: {
    height: 'auto',
  },
  connectionImage: {
    margin: 10,
    height: 80,
    width: 80,
    borderRadius: 10,
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

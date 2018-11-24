import React from 'react';
import app from '../styles/container.js';
import axios from 'react-native-axios';
import { Alert, ScrollView, StyleSheet, View, ListItem, Text, Image, TouchableHighlight, TouchableOpacity, Button, ImageBackground } from 'react-native';
const {ipv4} = require('../config.json');
var Connections = require('../Connection.json');
import moment from 'moment';

    let distance1 = 500;
    let distance2 = 1300;

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
    this.props.navigation.navigate('Track', { user: this.props.user });
  }



  render() {
    const { user = {}, isNear = false } = this.props;
    const { first_name, profile_picture } = user;
    let connectedAt = user.connected_at;
    let expiryAt = (moment(connectedAt).add(7,'days').format('YYYYMMDD'));
    let daysRemaining = moment(expiryAt).fromNow();


    return (

      <TouchableOpacity underLayColor="white" onPress={this._onPress} onLongPress={this._onLongPress}>

        <View style={[styles.cardClosed, this.state.open ? styles.cardOpen : null, isNear ? styles.near : null]}>
        <View style={styles.header}>
          <Image style={styles.connectionImage} source={{uri: profile_picture}}/>
          <Text style={styles.name}> {first_name} </Text>
        </View>

            {
            this.state.open ? <CardOpen deleteConnection={this.props.deleteConnection} person={ user } /> : null
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
    this.getConnections = this.getConnections.bind(this);
  }

  componentDidMount() {

    axios.get(`${ipv4}/user/${this.props.screenProps.currentUserId}/connections`)
    .then((res) => {
      this.setState({ userConnections: res.data , currentUserId: this.props.screenProps.currentUserId})
    })
    .catch(err => console.warn(err))
  }

  renderPage() {
    this.setState({currentUserId: this.props.screenProps.currentUserId},
      )
  }

  getConnections(){
    axios.get(`${ipv4}/user/${this.props.screenProps.currentUserId}/connections`)
    .then((res) => {
      this.setState({ userConnections: res.data })
    })
    .catch(err => console.warn(err))
  }

  deleteConnection(conn_id) {
    console.log("HI");
    axios.post(`${ipv4}/connections/${this.state.currentUserId}/${conn_id}/delete`)
      .then((res) => {
        this.setState({userConnections: res.data});
      })
      .catch((err) => console.warn(err))

  }

  // Need function with websocket data to update state of isNear above.



  render() {

    const { userConnections } = this.state;

    // Builds out a card for each connection
    return (
        <View style={app.container}>
          <ImageBackground
          source={{uri:'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/2770058/580/386/m1/fpnw/wm0/periwing-letter-p-logo-01-.jpg?1496098401&s=155373950722705ba03bec43a75c6dff'}}
          style={{width: '100%', height: '100%'}}
          >
            <ScrollView>
              { userConnections.map(
                (user, index) => <Card
                isNear={index % 2 === 0 /* Every other user for debug reasons */}
                deleteConnection={this.deleteConnection}
                user={ user }
                key={ user.id }
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

  header: {
    flexDirection:'row',
  },
  switch: {
    flexDirection: 'row',
    alignSelf: 'center',
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
    opacity: 0.92,
  },
  cardOpen: {
    height: 'auto',
  },
  near: {
    borderColor: 'gold',
    borderWidth: 5,
    borderStyle: 'solid',
  },
  connectionImage: {
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

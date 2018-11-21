import React from 'react';
import axios from 'react-native-axios';
import { Alert, ScrollView, StyleSheet, View, ListItem, Text, Image, TouchableHighlight, TouchableOpacity, Button } from 'react-native';
const {ipv4} = require('../config.json');
var Users = require('../HardCodedData.json');
var Connections = require('../Connection.json');


function CardClosed(props) {
  return (
    <View style={styles.content}>
      <Text style={styles.name}> {props.person.first_name} </Text>
      <Text style={styles.expiry}> 5 Days Remaining </Text>
    </View>
  )
}

function CardOpen(props) {
  let nuggets = props.person.nuggets;
  // let listItem = nuggets.map((nugget) =>

    return (
      <View style={styles.content}>
        <Text style={styles.name}> {props.person.first_name} </Text>
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
        <Text style={styles.expiry}> 5 Days Remaining </Text>
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
    // console.log("Longpress", this.props.person);
    console.log("Navagation", this.props.navigation);
    this.props.navigation.navigate('Track', { user: this.props.user });
  }

  render() {
    const { user = {} } = this.props
    // console.log("Render", user);
    const { first_name, profile_picture } = user;

    return (
       <TouchableOpacity underLayColor="white" onPress={this._onPress} onLongPress={this._onLongPress}>
        <View style={this.state.open ? styles.connectionProfileOpen : styles.connectionProfileClosed}>
          <Image style={styles.connectionImage} source={{uri: profile_picture}}/>
          {
            this.state.open ? <CardOpen  person={ user } /> : <CardClosed  person={ user } {...this.props} />
          }
         </View>
        </TouchableOpacity>
    )
  }
}
//---------------------------------------------------------------------------------------------------------------------------------//

export default class LinksScreen extends React.Component {

  static navigationOptions = {
    title: 'Your Connections',
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
      // console.log(res);
      this.setState({ users: res.data })
    })
    .catch(err => console.warn(err))
  }

  render() {

    const { users } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        { users.map((user, index) => <Card user={ user } key={index} {...this.props}/>)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
  connectionProfileClosed: {
    height: 100,
    width: 340,
    margin: 7,
    backgroundColor: 'lightsteelblue',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
  },
  connectionProfileOpen: {
    height: 'auto',
    width: 340,
    margin: 7,
    backgroundColor: 'lightsteelblue',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
  },
  connectionImage: {
    margin: 9,
    height: 80,
    width: 80,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    flex: 5,
    lineHeight: 90,
    fontSize: 27,
  },
  nuggets: {
    margin: 10,
  },
  expiry: {
    flex: 1,
    alignSelf: 'flex-end',
    fontSize: 12,
    fontStyle: 'italic',
  }

});

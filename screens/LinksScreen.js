import React from 'react';
import { Alert, ScrollView, StyleSheet, View, ListItem, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
var Users = require('../HardCodedData.json');
var Connections = require('../Connection.json');

function CardClosed(props) {
  return (
    <View style={styles.content}>
      <Text style={styles.name}> {props.person.firstName} </Text>
      <Text style={styles.expiry}> 5 Days Remaining </Text>
    </View>
  )
}

function CardOpen(props) {
  let nuggets = props.person.nuggets;
  // let listItem = nuggets.map((nugget) =>


    return (
      <View style={styles.content}>
        <Text style={styles.name}> {props.person.firstName} </Text>
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
    nuggets: Users.nuggets
  }

  _onPress = (event) => {
    this.setState((prevState) => {
      return {
        open: !prevState.open
      }
    });
  }

  render() {
    return (
       <TouchableOpacity underLayColor="white" onPress={this._onPress}>
        <View style={this.state.open ? styles.connectionProfileOpen : styles.connectionProfileClosed}>
          <Image style={styles.connectionImage} source={{uri: this.props.person.profileImage}}/>
          {
            this.state.open ? <CardOpen  person={ this.props.person } /> : <CardClosed  person={ this.props.person } />
          }
         </View>
        </TouchableOpacity>
    )
  }
}
export default class LinksScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      cards: Users,
      connections: Connections
    }

    // this.findUserByIdFromConnections= this.findUserByIdFromConnections.bind(this);
  }
  static navigationOptions = {
    title: 'Your Connections',
  };

  // findUserByIdFromConnections(id) {
  //   if (Connections[id].secondaryUserId) {
  //     return Connections[id].secondaryUserId
  //   } else {
  //     console.log("FAILED")
  //   }
  // }

  render() {

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          this.state.connections.map((card, index) => {
            var users = this.state.cards;
            var tempUser;
            users.forEach(function(result){
              // console.log("rohit result ",result);
              if(card.secondaryUserId === result.id){
                tempUser = result;
              }
            });
            return (
              <Card
              person={tempUser}
              key={index}/>
            )
          })
        }
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

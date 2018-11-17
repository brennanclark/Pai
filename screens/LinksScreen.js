import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
var Users = require('../HardCodedData.json');
var Connections = require('../Connection.json');



const Card = (props) => {
  return (
    <View style={styles.connectionProfile}>
      <Image style={styles.connectionImage} source={{uri: props.person.profileImage}}/>
      <View>
        <Text style={styles.name}> {props.person.firstName} </Text>
        <Text style={styles.expiry}> 5 Days Remaining </Text>
      </View>
    </View>
  )
}

export default class LinksScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      cards: Users,
      connections: Connections
    }

    this.findUserByIdFromConnections= this.findUserByIdFromConnections.bind(this);
  }
  static navigationOptions = {
    // Here we can change the title at the top of the page
    title: 'Connections',
  };

  findUserByIdFromConnections(id) {
    if (Connections[id].secondaryUserId) {
      return Connections[id].secondaryUserId
    } else {
      console.log("FAILED")
    }
  }

  render() {

    return (

      <ScrollView contentContainerStyle={styles.container}>
      <View>
        {
          this.state.connections.map((conn, index) => {
            console.log(this.findUserByIdFromConnections(index))
          })
        }
      </View>
        {
          this.state.connections.map((card, index) => {
            var users = this.state.cards;
            var tempUser;
            users.forEach(function(result){
              console.log("rohit result ",result);
              if(card.secondaryUserId === result.id){
                tempUser = result;
              }
              //{console.log(card.secondaryUserId)}

            });
            return (
              <Card person={tempUser} key={index}/>
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
  connectionProfile: {
    height: 100,
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
  name: {
    flex:1
  },
  expiry: {
    textAlign: 'right'
  }

});

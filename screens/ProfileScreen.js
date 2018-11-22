import React from 'react';
import app from '../styles/container.js';
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
} from 'react-native';
import { WebBrowser, Permissions, Location} from 'expo';


const Nugget = ({
  question,
  answer,
}) => (
  <View style={styles.nuggetContainer}>
    <Text style={styles.nugget}>{ question }</Text>
    <Text style={styles.nugget}>{ answer }</Text>
  </View>
)

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  render() {

    return (

      <View style={app.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>

          <Image source={{uri: this.props.screenProps.profileImage}} style ={styles.profileImage}/>
          <Text style={styles.profileName}>{this.props.screenProps.user}</Text>

          <Text>Friends</Text>
          <Text>10</Text>

          <Button 
          onPress= {this.props.screenProps.findConnection}
          title = "find match"
          color = "purple"/>

          <View style={styles.switch}>
            <Button
            onPress={this.props.screenProps.changeToUserOne}
            title="User 1"
            color="blue"
            />

            <Button
            onPress={this.props.screenProps.changeToUserTwo}
              title="User 2"
            color="blue"
            />

            <Button
            onPress={this.props.screenProps.changeToUserThree}
            title="User 3"
            color="blue"
            />

            <Button
            onPress={this.props.screenProps.changeToUserFour}
            title="User 4"
            color="blue"
            />
        </View>
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
    width: 175,
    height: 175,
    alignSelf: 'center',
    borderRadius: 10,
  },

  profileName: {
    fontSize: 50,
    textAlign: 'center',
    margin: 5,
  },

  friendCounter: {
    textAlign: 'left',
  },

  title: {
    fontSize:30,
    textAlign: 'center',
  },

  switch: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  nugget: {
    padding: 5,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },


})
  // already created content

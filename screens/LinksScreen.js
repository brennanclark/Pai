import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    // Here we can change the title at the top of the page
    title: 'Connections',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.connectionProfile}>
          <Image style={styles.connectionImage} source={{uri:'http://www.asianage.com/sites/default/files/images/ZOOLANDER.jpg'}}/>
          <View>
            <Text style={styles.name}> Derek Zoolander </Text>
            <Text style={styles.expiry}> X Days Remaining </Text>
          </View>
        </View>
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
    textAlign: 'center',
  },
  expiry: {
    textAlign: 'right'
  }

});

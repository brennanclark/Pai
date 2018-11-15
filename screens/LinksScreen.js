import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    // Here we can change the title at the top of the page
    title: 'Connections',
  };

  render() {
    return (
      <ScrollView style={styles.container}>

        <Text> It's nice that we don't have to use quotes to render text using these React Native compoenents. Looks like text wraps automatically as well. That's also nice... Anywho :
          Bluefin tuna broadband dogfish carp Hammerjaw: hawkfish dab, "armoured catfish salmon shark," sand diver mooneye prickleback. Tiger barb pelican gulper Australian prowfish woody sculpin four-eyed fish, peacock flounder; gurnard sea dragon bandfish zebra pleco speckled trout.
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

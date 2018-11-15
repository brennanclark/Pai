import React from 'react';
import { Text, StyleSheet, View} from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    // Here we can change the title at the top of the page
    title: 'Connections',
  };

  render() {
    return (
      <View style={styles.container}>
       <Text>
          PLACEHOLDER
       </Text>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#c8e1f2',
  },
});
class LoginScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Login screen</Text>
      </ScrollView>
    );
  }
}

LoginScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: (
    <TouchableOpacity onPress={() => navigation.navigate("Main")}>
      <Text>To Main Tabs</Text>
    </TouchableOpacity>
  )
});

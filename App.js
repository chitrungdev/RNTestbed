import React, { Component } from "react"
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from "react-native"
// import firebase from "./Firebase"
import * as firebase from "firebase"

export default class App extends Component {
  constructor() {
    super()
    this.ref = firebase.firestore().collection("collection")
    this.unsubscribe = null
    state: [{ email: "", password: "", errorMessage: null }]
  }
  onCollectionUpdate = querySnapshot => {
    querySnapshot.forEach(doc => {
      console.log(doc.data())
    })
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: "50%", width: "100%" }}>
          <Text>UserName</Text>
          <TextInput
            style={{ flex: 1, borderWidth: 0.5 }}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Text>Pass</Text>
          <TextInput
            style={{ flex: 1, borderWidth: 0.5 }}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity
            onpress={this.handleSignUp.bind()}
            style={{ flex: 1 }}
          >
            <Text>Dang Ky</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: "50%", width: "100%" }}>
          <Text>UserName</Text>
          <TextInput style={{ flex: 1, borderWidth: 0.5 }} />
          <Text>Pass</Text>
          <TextInput style={{ flex: 1, borderWidth: 0.5 }} />
          <TouchableOpacity style={{ flex: 1 }}>
            <Text>Dang nhap</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("Main"))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
})

import React, { Component } from "react"
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from "react-native"
import firebase from "./Firebase"
// import * as firebase from "firebase"
import firestore from "firebase/firestore"

export default class App extends Component {
  constructor() {
    super()
    // this.ref = firebase.firestore().collection("collection")
    // this.unsubscribe = null
    this.state = {
      emailSU: "",
      passwordSU: "",
      errorMessageSU: null,
      emailSI: "",
      passwordSI: "",
      errorMessageSI: null,
      uid: "",
      address: ""
    }
  }
  // onCollectionUpdate = querySnapshot => {
  //   querySnapshot.forEach(doc => {
  //     console.log(doc.data())
  //   })
  // }
  // componentDidMount() {
  //   this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  // }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text>UserName</Text>
          <TextInput
            style={{ height: 50, width: "100%", borderWidth: 0.5 }}
            onChangeText={emailSU => this.setState({ emailSU })}
            value={this.state.emailSU}
          />
          <Text>Pass</Text>
          <TextInput
            style={{ height: 50, width: "100%", borderWidth: 0.5 }}
            onChangeText={passwordSU => this.setState({ passwordSU })}
            value={this.state.passwordSU}
          />
          <TouchableOpacity
            onPress={this.handleSignUp}
            style={{ height: 50, width: "100%", borderWidth: 0.5 }}
          >
            <Text>Dang Ky</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%" }}>
          <Text>UserName</Text>
          <TextInput
            style={{ height: 50, width: "100%", borderWidth: 0.5 }}
            onChangeText={emailSI => this.setState({ emailSI })}
            value={this.state.emailSI}
          />
          <Text>Pass</Text>
          <TextInput
            style={{ height: 50, width: "100%", borderWidth: 0.5 }}
            onChangeText={passwordSI => this.setState({ passwordSI })}
            value={this.state.passwordSI}
          />
          <TouchableOpacity
            onPress={this.handleSignIn}
            style={{ height: 50, width: "100%", borderWidth: 0.5 }}
          >
            <Text>Dang nhap</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%" }}>
          <Text>Address</Text>
          <TextInput
            style={{ height: 50, width: "100%", borderWidth: 0.5 }}
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
          />
          <TouchableOpacity
            onPress={this.addAddress}
            style={{ height: 50, width: "100%", borderWidth: 0.5 }}
          >
            <Text>Them Dia Chi</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={this.getAddress}
          style={{ height: 50, width: "100%", borderWidth: 0.5 }}
        >
          <Text>Lay Dia Chi</Text>
        </TouchableOpacity>
      </View>
    )
  }
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.emailSU, this.state.passwordSU)
      .then(() => console.log("Success"))
      .catch(error => console.log(error.message))
  }
  handleSignIn = () => {
    const { emailSI, passwordSI } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(emailSI, passwordSI)
      .then(response => {
        this.setState({ uid: response.user.uid })
        console.log("Success")
      })
      .catch(error => console.log(error.message))
  }
  addAddress = () => {
    data = { Address: this.state.address }
    firebase
      .firestore()
      .collection("Address")
      .doc(this.state.uid)
      .set(data)
      .then(() => console.log("Success"))
      .catch(error => console.log(error.message))
  }
  getAddress = () => {
    let me = this
    address = firebase
      .firestore()
      .collection("Address")
      .doc(this.state.uid)
      .get()
      .then(doc => {
        me.setState({ address: doc.data().Address })
        console.log("Success")
      })
      .catch(function(error) {
        console.log("Error getting document:", error)
      })
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

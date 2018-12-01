import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, Button } from 'react-native';
import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default class Splash extends React.Component {

  static navigationOptions = {
    title: 'Welcome to Paird',
  };

  constructor(props) {
    super(props);
      this.state = {
        info : {}
      }
      this.GSignIn = this.GSignIn.bind(this);
      this.isNewMerchant = this.isNewMerchant.bind(this);
  }

  isNewMerchant = async (id) => {
    // const ref = await firebase.firestore().collection('merchants').doc(id);
    //
    // firebase.firestore().runTransaction(async transaction => {
    //   let doc = await transaction.get(ref)
    //
    //   (!doc.exists) ? return true : return false;
    //
    // }).then(res => {
    //   console.log("successfully got post request." + res);
    // }).catch(error => {
    //   console.log("error is " + error);
    // })
    return  false
  }

  //Google signIN
  GSignIn = async () => {
    GoogleSignin.configure();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ info : userInfo });

      if(userInfo){
        let isNew = this.isNewMerchant(userInfo.user.id);
        console.log(isNew);

        (() => {
          this.props.navigation.navigate('Homepage')
        })()
      }

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }
};

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.heading}> Paird. </Text>
      <GoogleSigninButton
        style={{ width: 312, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.GSignIn}
        disabled={this.state.isSigninInProgress} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
  },
  heading : {
    height: 200,
    fontWeight: 'bold',
    fontSize: 80,
}
});
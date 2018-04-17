import React, { Component } from 'react';
import { Alert, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Kaede } from 'react-native-textinput-effects';
//Home Screen

class LoginScreen extends React.Component {
  constructor()
    {
        super();

        this.state = {
          username: 'admin',
          password: 'admin',
          ActivityIndicator_Loading: false,
        }
    }
    //fungsi mengirim data ke database
    UserLoginFunction = () =>{
 this.setState({ ActivityIndicator_Loading : true }, () =>
        {
fetch('http://api.gusnando.com/login.php',
{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username : this.state.username,
    password : this.state.password,
  })

}).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ ActivityIndicator_Loading : false });
        // If server response message same as Data Matched
       if(responseJson === 'Login berhasil!')
        {
            //Then open Profile activity and send user email to profile activity.
            this.props.navigation.navigate('Tabs');
        }
        else{
          Alert.alert(responseJson);
        }

      }).catch((error) => {
        console.error(error);
        this.setState({ ActivityIndicator_Loading : false});
      });

    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style = { styles.MainContainer }>
                <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
                 <Image
                    source={require('./assets/NavLogo.png')}//image
                    style={{width: 150, height: 150 }}
                  />
               </View>
                <Kaede
                  placeholder = "Username"
                  label={'Username'}
                  underlineColorAndroid = "transparent"
                  onSubmitEditing={() => this.passInput.focus()}
                  onChangeText = {(TextInputText) => this.setState({ username: TextInputText })}
                  labelStyle={{ color: '#00BCD4' }}
                  inputStyle={{backgroundColor: '#00BCD4', color: '#FFFFFF'}}
                  placeholderTextColor='#FFFFFF'
                  style={{marginVertical: 10, marginHorizontal: 20}}
                />
                <Kaede
                  placeholder = "Password"
                  label={'Password'}
                  underlineColorAndroid = "transparent"
                  labelStyle={{ color: '#00BCD4' }}
                  inputStyle={{backgroundColor: '#00BCD4', color: '#FFFFFF'}}
                  placeholderTextColor='#FFFFFF'
                  style={{marginVertical: 10, marginHorizontal: 20}}
                  returnKeyType="done"
                  returnKeyType="go"
                  autoCapitalize="none"
                  secureTextEntry
                  ref={(input) => this.passInput = input}
                  onChangeText = {(TextInputText) => this.setState({ password: TextInputText })} />



                <TouchableOpacity
                  activeOpacity = { 0.5 }
                  style = { styles.button }
                  onPress = { this.UserLoginFunction }>

                    <Text style = { styles.buttonText }>LOGIN</Text>

                </TouchableOpacity>

                {

                this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null

                }

            </KeyboardAvoidingView> //penutup containerMain


    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create(
{
    MainContainer:
    {
      flex: 1,
      backgroundColor: '#E91E63',
    },

    TextInputStyleClass:
    {
      textAlign: 'center',
      height: 40,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },

    BoxClass:
    {
      alignItems: 'center',
      height: 40,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },

    button:
   {
      marginTop: 10,
      backgroundColor:'#00BCD4',
      marginBottom: 40,
      borderRadius: 7,
      paddingVertical: 10,
      marginHorizontal: 20,
    },

    buttonText:
    {
        color: '#fff',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    },

    ActivityIndicatorStyle:{

      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'

  },
  Header: {
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextHeader: {
        fontSize: 30,
        color: '#2196F3'
    },
});

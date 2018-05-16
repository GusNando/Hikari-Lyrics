import React, { Component } from 'react';
import { RefreshControl, Text, View, Image, StyleSheet, Alert, TextInput, ScrollView, ActivityIndicator, TouchableOpacity,  FlatList, List, ListItem, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Avatar} from 'react-native-elements';
import { Kaede } from 'react-native-textinput-effects';


export default class ProfileScreen extends React.Component {
    constructor()
      {
          super();
          this.state = {
            title: '',
            artist: '',
            album: '',
            lyrics: '',
            ActivityIndicator_Loading: false,
          }
      }

      submitData = () =>
      {
          this.setState({ ActivityIndicator_Loading : true }, () =>
          {
              fetch('https://gusnando.com/api/submitlyrics.php',
              {
                  method: 'POST',
                  headers:
                  {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(
                  {
                    title : this.state.title,
                    artist : this.state.artist,
                    album : this.state.album,
                    lyrics : this.state.lyrics
                  })

              }).then((response) => response.json()).then((responseJsonFromServer) =>
              {
                  Alert.alert('SUCESS',responseJsonFromServer);
                  this.setState(
                  {
                    title: '',
                    artist: '',
                    album: '',
                    lyrics: '',
                    ActivityIndicator_Loading : false
                  });

              }).catch((error) =>
              {
                  console.error(error);

                  this.setState({ ActivityIndicator_Loading : false});
              });
          });
      }

  render() {
    return (
      <View style={styles.containerMain}>
        <StatusBar
          backgroundColor="#AD1457"
          barStyle="light-content"
        />

        <Text style={styles.title}>HIKARI LYRICS</Text>
        <Text style={styles.subTitle}>MY PROFILE</Text>

        <View style={{alignItems: 'center', marginTop: 10}}>
        <Avatar
          size="xlarge"
          rounded
          title="AD"
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>Admin</Text>
        <Button
          title='Edit Profile'
          containerStyle={{ marginTop: 10, paddingHorizontal: 10}}
        />
        <Button
          containerStyle={{ marginTop: 20}}
          title='Lyrics Submission'
          onPress={() => this.props.navigation.navigate('Add')}
        />

        </View>

   </View>

    );
  }
}
const styles = StyleSheet.create(
{
  containerMain: {
    flex: 1,
  },
  containerAddLyrics:{
    flex: 4,
    backgroundColor: '#22313F',
    padding: 20,
  },
  title: {
    backgroundColor: '#E91E63',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 8,
    paddingBottom: 3,
    textAlign: 'center',
  },
  subTitle: {
    backgroundColor: '#E91E63',
    color: '#fff',
    fontSize: 14,
    paddingBottom: 8,
    textAlign: 'center',
  },

  menuContainer: {
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    flexDirection: 'row'
  },
  menu:{
    flex: 1
  },
  menuIcon:{
    color: 'white',
    textAlign: 'center'
  },
  menuIconSelected:{
    color: '#00BCD4',
    textAlign: 'center'
  },
  titleAdd: {
    textAlign: 'center',
    fontSize: 28,
    marginTop: 10,
    marginBottom: 30,
    color: '#00BCD4',
    fontWeight: 'bold',
  },
  textInput: {
    marginBottom: 10,
    fontSize: 18,
    height: 50,
    paddingLeft: 10,
  },
  multiTextInput: {
    marginBottom: 10,
    fontSize: 18,
    height: 70,
    paddingLeft: 10,
  },
  textInputLabel: {
    paddingLeft: 4,
    fontWeight: 'bold',
  },
  submitButtonText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#00BCD4',
    borderRadius: 30,
    paddingVertical: 4,
  }
});

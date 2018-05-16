import React, { Component } from 'react';
import { Alert, RefreshControl, Button, Text, View, Image, ScrollView, StyleSheet, TextInput, ActivityIndicator, StatusBar, TouchableOpacity, FlatList, List, ListItem, KeyboardAvoidingView } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import YouTube from 'react-native-youtube';

export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: null,
  };

constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      artist: '',
      album: '',
      image: '',
      youtube: '',
      lyrics: '',
      ActivityIndicator_Loading: false,
    };
}

  componentDidMount()  {
    this.setState({
        id : this.props.navigation.state.params.id,
        title: this.props.navigation.state.params.title,
        artist: this.props.navigation.state.params.artist,
        album: this.props.navigation.state.params.album,
        image: this.props.navigation.state.params.image,
        youtube: this.props.navigation.state.params.youtube,
        lyrics: this.props.navigation.state.params.lyrics,
      })

     }

  UpdateRecord = () =>{
      this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('http://nukeninkonoha.000webhostapp.com/updateData.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              id : this.state.id,

              title : this.state.title,

              artist : this.state.artist,

              album : this.state.album,

              image : this.state.image,

              youtube : this.state.youtube,

              lyrics: this.state.lyrics

            })

            }).then((response) => response.json())
                .then((responseJson) => {
                  this.setState({ ActivityIndicator_Loading : false });
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);

                }).catch((error) => {
                  console.error(error);
                  this.setState({ ActivityIndicator_Loading : false });
                });
        });
      }
DeleteRecord = () =>{
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
          fetch('http://nukeninkonoha.000webhostapp.com/deleteData.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id : this.state.id
          })

          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({ ActivityIndicator_Loading : false });
            // Menampilkan pesan yang ada di query
            Alert.alert(responseJson);
            this.props.navigation.navigate('Data');

          }).catch((error) => {
             console.error(error);
             this.setState({ ActivityIndicator_Loading : false });
          });
          });
      }


  render() {
    return (
      <View style={styles.MainContainer}>
        <StatusBar
          backgroundColor="#AD1457"
          barStyle="light-content"
        />

        <Text style={styles.title}>HIKARI LYRICS</Text>
        <Text style={styles.subTitle}>TOP LYRICS</Text>


        <ScrollView>
          <YouTube
            videoId={''+this.state.youtube}  // The YouTube video ID
            play={false}             // control playback of video with true/false
            loop={true}             // control whether the video should loop when ended
            apiKey="AIzaSyAhGQBgdSxjgtVHPXFEMGuT5tM62opMPRw"
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}
            style={{ alignSelf: 'stretch', height: 300 }}
          />
          <View style={{flex:1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>

          <Image
            style={{flex:1, height: 300, width: 300, borderRadius: 3}}
            source={{uri: this.state.image}}
            resizeMode="contain"
          />
          </View>
            <Text style={styles.songTitle}>{this.state.title}</Text>
            <Text style={styles.artist}>{this.state.artist}</Text>
            <Text style={styles.album}>{this.state.album}</Text>
            <Text style={{fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>Original / Romaji Lyrics</Text>
            <Text style={styles.lyrics}>{this.state.lyrics}</Text>
        </ScrollView>
   </View>

    );
  }
}
const styles = StyleSheet.create(
{
    MainContainer:
    {
      flex: 1,
      backgroundColor: '#FFFFFF'
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
    songTitle: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 20,
    },
    artist:{
      marginTop: 5,
      textAlign: 'center',
    },
    album: {
      marginBottom: 5,
      textAlign: 'center',
    },
    lyrics: {
      marginTop: 20,
      marginHorizontal: 15
    }
});

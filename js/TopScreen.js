import React, { Component } from 'react';
import { RefreshControl, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity,  FlatList, List, ListItem, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import Icon from 'react-native-ionicons';

export default class TopScreen extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false,
    };
}

  componentDidMount()  {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        this.setState({refreshing: true});
        const url = 'http://api.gusnando.com/toplyrics.php';
       //this.setState({ loading: true });
        fetch (url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("comp");
          console.log(responseJson);
          this.setState({
            data: responseJson,
            error: responseJson.error || null,
            loading: false,
            refreshing: false,
            ActivityIndicator_Loading: false,

          });
        }
      );
    });
  }
  _keyExtractor = (item, index) => item.id;

GetIDFunction=(id, title, artist, album, image, youtube, lyrics)=>{

          this.props.navigation.navigate('Details', {

            id : id,
            title : title,
            artist : artist,
            album : album,
            image : image,
            youtube : youtube,
            lyrics : lyrics,

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
        <Text style={styles.subTitle}>TOP LYRICS</Text>



        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>

          <TouchableOpacity activeOpacity={0.7} style={styles.row}
            onPress={this.GetIDFunction.bind(this, item.id, item.title, item.artist, item.album, item.image, item.youtube, item.lyrics,)} >

          <View style={styles.iconContainer}>
            <Image
              style={{flex:1, height: 60, width: 60, borderRadius: 6}}
              source={{uri: item.image}}
              resizeMode="contain"
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songDetails}>{item.artist} | {item.album}</Text>
          </View>

          </TouchableOpacity>

        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }
        />



   </View>

    );
  }
}
const styles = StyleSheet.create(
{
    containerMain: {
      flex: 1,
      backgroundColor: '#FFFFFF'
    },
    row: {
      borderColor: '#f1f1f1',
      borderBottomWidth: 1,
      flexDirection: 'row',
      marginHorizontal: 10,
      paddingTop: 12,
      paddingBottom: 12,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
      width: 60,
    },
    icon: {
      color: '#fff',
      height: 30,
      width: 30,
      textAlign: 'center'
    },
    info: {
      flex: 1,
      paddingLeft: 16,
      paddingRight: 16,
      marginTop: 5,
    },
    songTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
    },
    songDetails: {
      color: '#ccc',
      fontSize: 14,
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
});

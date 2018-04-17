import React, { Component } from 'react';
import { RefreshControl, Button, Text, View, Image, StyleSheet, TextInput, ScrollView, ActivityIndicator, TouchableOpacity,  FlatList, List, ListItem, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import Icon from 'react-native-ionicons';
import { Kaede } from 'react-native-textinput-effects';
//Data Screen
class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
        <Image
          source={require('./assets/spiro.png')}
          style={{width: 30, height: 30, tintColor: '#2196F3'  }}
        />
      </View>
    );
  }
}

export default class DataScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

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
        const url = 'http://api.gusnando.com/artist.php';
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

  cariData = () => {
            this.setState({ ActivityIndicator_Loading: true },
                () => {
                    this.setState({ refreshing: true });
                    fetch(
                            "http://api.gusnando.com/artistsearch.php", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    cari: this.state.cari
                                })
                            }
                        )
                        .then(response => response.json())
                        .then(responseJson => {
                            console.log("comp");
                            console.log(responseJson);
                            this.setState({
                                data: responseJson,
                                error: responseJson.error || null,
                                loading: false,
                                refreshing: false,
                                ActivityIndicator_Loading: false
                            });
                        });
                }
            );
        };

GetIDFunction=(id, title, artist, album, lyrics)=>{

          this.props.navigation.navigate('Details', {

            id : id,
            title : title,
            artist : artist,
            album : album,
            lyrics : lyrics,

          });
        }

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar
          backgroundColor="#AD1457"
          barStyle="light-content"
        />

        <Text style={styles.title}>HIKARI LYRICS</Text>
        <Text style={styles.subTitle}>ARTIST</Text>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.componentDidMount.bind(this)}
            />
          }
        >
          <Kaede
            placeholder = "Artist Name"
            label={'Search'}
            underlineColorAndroid = "transparent"
            returnKeyType="done"
            onChangeText = {(TextInputText) => this.setState({ cari
              : TextInputText })}
            onChange = {this.cariData}
            style={{marginVertical: 20, marginHorizontal: 10, }}
            labelStyle={{ color: '#00BCD4' }}
            inputStyle={{backgroundColor: '#00BCD4', color: '#FFFFFF'}}
            placeholderTextColor='#FFFFFF'

          />
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>

          <TouchableOpacity activeOpacity={0.7} style={styles.row}
            onPress={this.GetIDFunction.bind(this, item.id, item.title, item.artist, item.album,item.lyrics,)} >

          <View style={styles.iconContainer}>
            <Icon style={styles.icon} name="md-person"/>
          </View>
          <View style={styles.info}>
            <Text style={styles.songTitle}>{item.artist}</Text>
          </View>

          </TouchableOpacity>

        }

        />


        </ScrollView>
   </View>

    );
  }
}
const styles = StyleSheet.create(
{
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    backgroundColor: '#E91E63',
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    paddingTop: 12,
    paddingBottom: 5,
    textAlign: 'center',
  },
  subTitle: {
    backgroundColor: '#E91E63',
    color: '#fff',
    fontSize: 14,
    paddingBottom: 12,
    textAlign: 'center',
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
    backgroundColor: '#00BCD4',
    borderColor: '#00BCD4',
    borderRadius: 50,
    borderWidth: 1,
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
    marginTop: 16,
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
});

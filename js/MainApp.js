import React, { Component } from 'react';
import { Alert, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import TopScreen from './TopScreen'; //memanggil file TopScreen
import DetailsScreen from './DetailsScreen';
import LyricsScreen from './LyricsScreen'; //memanggil file LyricsScreen
import LoginScreen from './LoginScreen';
import ArtistScreen from './ArtistScreen';
import AddScreen from './AddScreen';
import ProfileScreen from './ProfileScreen';

import Icon from 'react-native-ionicons'

export default class MainApp extends React.Component {
  render() {
    return (
      <AppRouter /> //memanggil AppRouter Screen
    );
  }
}
//login ku ganti Lyrics screen
const LoginStack = StackNavigator({
  Login: { screen: LoginScreen },
  }, {
    navigationOptions: {
      header: false,
    }
});
const ArtistStack = StackNavigator({
  Artist: { screen: ArtistScreen },
  }, {
    navigationOptions: {
      header: false,
    }
});

const AddStack = StackNavigator({
  Add: { screen: AddScreen },
  }, {
    navigationOptions: {
      header: false,
    }
});

const ProfileStack = StackNavigator({
  Profile: { screen: ProfileScreen },
  Add: { screen: AddScreen },
  }, {
    navigationOptions: {
      header: false,
    }
});

const TopStack = StackNavigator({
  Top: { screen: TopScreen }, //memanggil class TopScreen yang ada di file TopScreen
  }, {
    navigationOptions: {
      header: false,
    }
});

const LyricsStack = StackNavigator(
  {
    Lyrics: { screen: LyricsScreen }, //memanggil class LyricsScreen yang ada di file LyricsScreen
    Details: { screen: DetailsScreen },
  },
  {
    navigationOptions: {
      header: false,
    }
  }
);


const ScreenTab =  TabNavigator(
  {
    Top: { screen: TopStack }, //memanggil stack navigator TopStack
    Lyrics: { screen: LyricsStack }, //memanggil stack navigator LyricsStack
    Artist: { screen: ArtistStack }, //memanggil stack navigator Artist

    Profile: { screen: ProfileStack }, //memanggil stack navigator LyricsStack
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Top') {
          iconName = 'md-heart';
        } else if (routeName === 'Lyrics') {
          iconName = 'md-musical-notes';
        } else if (routeName === 'Artist') {
          iconName = 'md-person';
        }
        else if (routeName === 'Profile') {
          iconName = 'md-contact';
        }
        return <Icon android={iconName} size={25} color={tintColor} />;
      },
    }),

    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#00BCD4',
      inactiveTintColor: '#FFFFFF',
      style: {
         backgroundColor: '#E91E63',
      }
    },
    animationEnabled: false,
    swipeEnabled: true,
  }
);


export const AppRouter = StackNavigator(
  {
    Login: { screen: LoginStack },
    Tabs: { screen: ScreenTab },
  },
  {
    navigationOptions:
    {
      header: false,
      gesturesEnabled: false
    }
  }
);

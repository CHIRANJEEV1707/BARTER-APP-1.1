import * as React from 'react'
import {Image} from 'react-native'
import {createBottomTabNavigstor} from 'react-navigation-tabs'
import RequestScreen from '../Screens/RequestScreen'
import DonateScreen from '../Screens/DonateScreen'

export const AppTabNavigator=createBottomTabNavigstor({
          DonateItems:{
                    screen: DonateScreen,
                    navigationOption:{
                              tabBarLabel:"Donate Items"
                    }
          },

          RequestItems:{
                    screen:RequestScreen,
                    navigationOptiion:{
                              tabBarLabel:"Request Items"
                    }
          }
});
import * as React from 'react'
import {createDrawerNavigation} from 'react-navigation-drawer';
import {AppTabNavigatior} from './AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu'
import SettingsScreen from '../Screens/SettingsScreen'

export const AppDrawerNavigator = createDrawerNavigation ({
  Home : {
    screen : AppTabNavigator
    },
  Setting : {
    screen : SettingsScreen
  },
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })

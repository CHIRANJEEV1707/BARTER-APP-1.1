import * as React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import DonateScreen from '../Screens/DonateScreen'
import MyBarterScreen from '../Screens/MyBarterScreen'

const AppStackNavigator=createStackNavigator({
          DonateScreen:{
                    screen:DonateScreen,
                    navigationOptions:{
                              headerShown:false
                    }
          },
          MyBarterScreen:{
                    screen:MyBarterScreen,
                    navigationOptions:{
                              headerShown:false
                    }
          },
},
          {
                    initialRouteName:'BookDonateScreen'
          }
)         
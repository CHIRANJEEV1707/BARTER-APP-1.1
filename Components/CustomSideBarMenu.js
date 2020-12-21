import * as React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import {DrawerItems} from 'react-Navigation-drawer'
import WelcomeScreen from '../Screens/WelcomeScreen'

import firebase from 'firebase'

export default class CustomSideBarMenu extends React.Component{
          render(){
                    return(
                              <View>
                                        <View>
                                                  <DrawerItems{...this.props}/>
                                        </View>
                                        <View>
                                                  <TouchableOpacity
                                                  onPress={()=>{
                                                            this.props.navigation.navigate('WelcomeScreen')
                                                            firebase.auth().signOut()
                                                  }}
                                                  >
                                                            <Text>Log Out</Text>
                                                  </TouchableOpacity>
                                        </View>
                              </View>
                    )
          }
}
import * as React from 'react'
import {Header,Icon,Badge} from 'react-native-element'
import {View,Text,Alert} from 'react-native'

const MyHeader=props=>{
          <Header
          leftComponent={
                    <Icon name ='bars' type='font-awesome' onPress={()=>
                    props.navigation.toggleDrawer()
                    }
                    />
          } 
          centerComponent={
                    {
                              text:props.title,
                    }
          }
          />
}

export default MyHeader;
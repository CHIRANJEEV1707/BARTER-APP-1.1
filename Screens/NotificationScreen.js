import * as React from 'react'
import {Text,View,TouchableOpacity} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../Components/MyHeader'
import {ListItem,Icon} from 'react-native-elements'

export default class NotificationScreen extends React.Component{

          constructor(){
          super();
          this.state={
                    allNotification=[],
                    userId=firebase.auth().currentUser.email,
          }
          }

          getNotification=()=>{
                    this.notificationRef=db.collections("allNotifications")
                    .where("Notification status","==","unread")
                    .where("targeted_userid","==",this.state.userId)
                    .onSnapshot((snapshot)=>{
                              var allNotifications=[]
                              snapshot.docs.map((doc)=>{
                                        notifications["docId"]=doc.id
                                        allNotification.push(allNotification)
                              })
                              this.setState({
                                        allNotification:allNotification
                              })
                    })
          }

          componentDidMount(){
                    this.getNotification();
          }

          keyExtractor=(item,index)=>index.toString();

          renderItem=({item,index})=>{
                    render(
                     <ListItem
                     key={index}
                     leftElement={<Icon name="ITEM" type="font-awesome" color="limegreen"/>}
                     title={item.itemName}
                     subtitle={item.message}
                     bottomDivider
                     />
                    )
          }

          render(){
                    return(
                              <View>
                                        <View>
                                                  <MyHeader
                                                  title="NOTIFICATIONS"
                                                  navigation={this.props.navigation}
                                                  />
                                        </View>
                                        <View>
                                                  {this.state.allNotification.lenght==0?(
                                                            <Text>YOU HAVE NO NOTIFICATIONS</Text>
                                                  ):(<SwipeableFlatList allNotification={this.state.allNotification}></SwipeableFlatList>)
                                                  }
                                        </View>

                              </View>
                    )
          }
}
import * as React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import {Card,Header} from 'react-native-elements'

export default class RecieverDetailScreen extends React.Component{
          constructor(){
                    super();
                    this.state={
                              userId:firebase.auth.currentUser.email,
                              recieverName:'',
                              recieverAddress:'',
                              recieverContact:'',
                              recieverId:this.props.navigation.getParam('details')['user_id'],
                              recieverRequestDocId:'',
                              recieverItemName:this.props.navigation.getParam('details')['item_name'],
                              requestId:this.props.navigation.getParam('details')['request_id'],
                              requestReason:this.props.navigation.getParam('details')['reasonToRequest'],
                              userName:'',
                    }
          }

          updateItemStatus=()=>{
                    db.collection('all_barters').add({
                           "item_name" : this.state.recieverItemName,
                           "request_id" : this.state.recieverRequestDocId,
                           "requested_by" : this.state.recieverName,
                           "donor_id" : this.state.userId,
                           "request_status" : "Donor Interested"
                    })
          
                    }

                    addNotification=()=>{
                              var message=this.state.userName + "has shown interest in donating the book"
                              db.collection("all_notifications").add({
                                        "targeted_user_id" : this.state.recieverId,
                                        "donor_Id" : this.state.userId,
                                        "request_Id":this.state.requestId,
                                        "item_name":this.state.recieverItemName,
                                        "date" : firebase.firestore.FieldValue.serverTimestamp(),
                                        "notification_status":"unread",
                                        "message": message,
                              })
                    }

                    getRecieverDetails(){
                              db.collection('users').where('email_id','==',this.state.recieverId).get()
                              .then(snapshot=>{
                                        snapshot.forEach(doc=>{
                                                  this.setState({
                                                            recieverName:doc.data().first_name,
                                                            recieverContact:doc.data().contact,
                                                            recieverAddress:doc.data().address,
                                                  })
                                        })
                              })
                              db.collections('requested_items').where('request_id','==',this.state.requestId).get()
                              .then(snapshot=>{
                                        snapshot.forEach(doc=>{
                                                  this.setState({recieverRequestDocId:doc.id})
                                        })
                              })
                    }

                    getUserDetails=(userId)=>{
                              db.collection("users").where('email_id','==', userId).get()
                              .then((snapshot)=>{
                                snapshot.forEach((doc) => {
                                  this.setState({
                                    userName  :doc.data().first_name + " " + doc.data().last_name
                                  })
                                })
                              })
                            }

                            componentDidMount(){
                              this.getRecieverDetails()
                              this.getUserDetails(this.state.userId)
                            }
          
          render(){
                    return(
                              <view>
                                         <Header
                                       leftComponent={
                                                 <Icon name='arrow-left' type='feather' color='black' onPress={()=>this.props.navigation.goBack}/>}
                                       centerComponent={{text:'EXCHANGE ITEMS'}}
                                       backgroundColor="limegreen"
                                       />

                                       <View>
                                       <Card>
                                                 title={"ITEM DETAILS"}
                                                 title style={{fontsize: 20}}
                                       </Card>

                                       <Card>
                                       <Text>Name:{this.state.recieverItemName}</Text>
                                       </Card>

                                       <Card>
                                        <Text>Reason:{this.state.requestReason}</Text>
                                       </Card>
                                       </View>
                                       <View>
                                                 <Card>
                                                           title={"Reciever Information"}
                                                 </Card>
                                                 <Card>
                                       <Text>Name:{this.state.recieverName}</Text>
                                                 </Card>
                                                 <Card>
                                        <Text>Address:{this.state.recieverAddress}</Text>
                                                 </Card>

                                                 <Card>
                                       <Text>Contact:{this.state.recieverContact}</Text>
                                                 </Card>
                                       </View>
                                       <View>
                                                 {
                                                           this.state.recieverId !== this.state.userId
                                                           ?(
                                                            <TouchableOpacity
                                                            onPress={()=>{
                                                                      this.updateItemStatus()
                                                                      this.addNotification()
                                                                      this.props.navigation.navigate('MyDonations')
                                                            }}
                                                            >
                                                                      <Text>I WANT TO EXCHANGE</Text>
                                                            </TouchableOpacity>
                                                           )
                                                           :null
                                                 }
                                       </View>

                              </view>
                    )
          }
}
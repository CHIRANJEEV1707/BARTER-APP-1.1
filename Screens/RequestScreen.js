import * as React from 'react'
import {View,TouchableOpacity,Text,TextInput, Alert,KeyboardAvoidingView} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../Components/MyHeader'

export default class RequestScreen extends React.Component(){
          constructor(){
                    super();
                    this.state={
                              itemName:'',
                              Reason:'',
                              userId:firebase.auth().currentUser.email,
                    }
          }

          createUniqueId(){
                    return Math.random().toString(36).substring(7)
          }
          
          getItemRequest=()=>{
                    var itemRequest=db.collections('requestedItem')
                    .where('userId','==',this.state.userId)
                    .get()
                    .then((snapShot)=>{
                              snapShot.forEach((doc)=>{
                                        if(doc.data().itemStatus!=="Recieved"){
                                                  this.setState({
                                                            requestId:doc.data().requestId,
                                                            requestItemName:doc.data().requestItemName,
                                                            itemStatus:doc.data().itemStatus,
                                                            docId:docId,
                                                  })
                                        }
                              })
                    })
          }

          getIsItemActive=()=>{
                    db.collections('user').where('emailId','==','this.state.userId')
                    .onSnapshot(querysnapShot=>{
                    querysnapShot.forEach((doc)=>{
                              this.setState({
                                        isItemRequestActive:doc.data().isItemRequestActive,
                                        userDocId:doc.id,
                              })
                    })
                    })
          }

          addRequest=(bookName,bookReason)=>{
                    var userId=this.state.userId
                    var randomRequestId=Math.random()

                    db.collection('requested_items').add({
                              "userId":userId,
                              "itemName":itemName,
                              "Reason":Reason,
                              "requestId":randomRequestId
                    })

                    await this.getItemRequest()

                    db.collection('user').where('emailId','==',this.state.userId).get()
                    .then()
                    .then((snapShot)=>{
                              snapShot.forEach((doc)=>{
                              db.collection('user').doc(doc.id).update({
                                        isItemRequestActive:true,
                              })
                              })
                    })

                    this.setState({
                              itemName:'',
                              Reason:''
                    })
                    return(
                              Alert.alert("ITEM REQUESTED SUCESSFULLY")
                    )

          }

          updateItemRequestStatus=()=>{
                    db.collections('requestedItem').doc(this.state.docId)
                    .update({itemStatus:'recieved'})
                    db.collections('user').where('emailId','==',this.state.userId).get()
                    .then((snapShot)=>{
                              snapShot.forEach((doc)=>{
                                        db.collection('user').doc(doc.id).update({
                                                  isItemRequestActive:false,
                                        })
                              })
                    })
          }

          sendNotification=()=>{
                    db.collection('user ').where('emailId','==',this.state.userId).get()
                    .then((snapShot)=>{
                              snapShot.forEach((doc)=>{
                                        var firstName=doc.data().userFirstName,
                                        var lastName=doc.data().userLastName
                                        db.collection('all_notification').where('emailId','==',this.state.userId).get()
                                        .then((snapShot)=>{
                                                  snapShot.forEach((doc)=>{
                                                            var donorId=doc.data().donorId,
                                                            var itemName=doc.data().itemName
                                                            db.collection('all_notification').add({
                                                                      'targettedUserId':donorId,
                                                                      'notificationStatus':"unread",
                                                                      'itemName':itemName,
                                                            })
                                                  })
                                        })
                              })
                    })
          }

          recievedItem=(itemName)=>{
          var userId=this.state.userId,
          var requestId=this.state.requestId
          db.collection('recievedItem').add({
                    'userId':userId,
                    'requestId':requestId,
                    'itemStatus':itemStatus,
                    'itemName':itemName,
          })
          }
          
          render(){
                    if(this.state.isItemRequestActive==true){
                              return(
                                        <View>
                                                  <View>
                                                            <Text>ITEM NAME</Text>
                                                            <Text>{this.state.requestItemName}</Text>
                                                  </View>
                                                  <View>
                                                            <Text>ITEM STATUS</Text>
                                                            <Text>{this.state.itemStatus}</Text>
                                                  </View>
                                                  <View>
                                                            <TouchableOpacity
                                                            onPress={()=>{
                                                                      this.sendNotification();
                                                                      this.updateItemRequestStatus();
                                                                      this.recievedItem(this.state.requestItemName);
                                                            }}
                                                            >
                                                                      <Text>I RECIEVED THE ITEM</Text>
                                                            </TouchableOpacity>
                                                  </View>
                                        </View>
                              )
                    }
                    else{
                    return(
                              <View>
                                        <Header
                                        centerComponent="REQUEST ITEM"
                                        />
                                        <View>
                                         <TextInput
                                         placeholder="PLEASE ENTER YOUR ITEM NAME"
                                         value={this.state.itemName}
                                         onChangeText={(text)=>{
                                                   this.setState({
                                                             itemName: text
                                                   })
                                         }}
                                         /> 
                                         <TextInput
                                         placeholder="PLEASE MENTION REASON TO REQUEST ITEM"
                                         multiline
                                         onChangeText={(text)=>{
                                                   this.setState({
                                                             Reason: text
                                                   })
                                         }}
                                         value={this.state.Reason}
                                         />   
                                         <TouchableOpacity
                                         onPress={()=>{
                                                   this.addRequest(this.state.itemName,this.state.Reason)
                                         }}>
                                                   <Text>
                                                    REQUEST
                                                   </Text>
                                                   </TouchableOpacity>    
                                        </View>
                              </View>
                    )
          }
          }
}
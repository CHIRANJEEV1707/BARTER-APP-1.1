import * as React from 'react'
import {Text,View,TouchableOpacity, TouchableHighlight} from 'react-native'
import {ListItem,Icon} from 'react-native-elements'
import {SwipeListView} from 'react-native-swipe-list-view'
import db from '../config'

export default class SwipeableFlatList extends React.Component{
          constructor(props){
                    super(props);
                    this.state={
                              allNotification=this.props.allNotification,
                    }
          }
          updateMarkAsRead=(notification)=>{
                    db.collections("all_notification").doc(notification.doc_id).update({
                              "notification_status":"read"
                    })
          }
          closeRow=(item,key)=>{
                    if(item[key]){
                              item[key].closeRow();
                    }
          }
          deleteRow=(item,key)=>{
                    var allNotification=this.state.allNotification
                    this.closeRow(item,key);
                    const newData=[...allNotification];
                    const prevIndex=allNotification.findIndex(item=>item.key===key)
                    this.updateMarkAsRead(allNotification[prevIndex])
                    newData.splice(prevIndex,1)
                    this.setState({allNotificatioin:newData})
          }
          onRowDidOpen=key=>{
                    console.log('this row opened',key);     
          }
          renderItem=data=>(
                    <TouchableHighlight>
                              <ListItem
                              leftElement={<Icon name="ITEM" type="font-awesome" color="limegreen"/>}
                              title={data.item.item_name}
                              subtitle={data.item.message}
                              bottomDivider
                              />
                    </TouchableHighlight>
          )
          renderHiddenItem=(data,item)=>(
                              <View>
                                        <Text>Left</Text>
                                        <TouchableOpacity
                                        onPress={()=>this.closeRow(item,data.item.key)}
                                        >
                                                  <Text>Close</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        onPress={()=>this.deleteRow(item,data.item.key)}
                                        >
                                                  <Text>Mark As Read</Text>
                                        </TouchableOpacity>
                              </View>
          )
          render(){
                    return(
                              <View>
                                           <SwipeListView
                data={this.state.allNotifications}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewkey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}

            />
             </View>
                    )
          }
}
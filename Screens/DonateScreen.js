import * as React from 'react'
import {View,Text,TouchableOpacity,FlatList} from 'react-native'
import {Header,ListItem} from 'react-native-element'
import db from '../config'
import firebase from 'firebase'

export default class DonateScreen extends React.Component{
          constructor(){
           super();
           this.state={
                     requestedItemList:[]
           }
           this.requestref=null
          }

          getRequestedItemList=()=>{
                    this.requestref=db.collection("requested_items")
                    .onSnapshot((snapshot)=>{
                              var requestedItemList=snapshot.docs.map(document=>{
                                        document.data()
                                        this.setState({
                                                  requestedItemList:requestedItemList
                                        })
                              })
                    })
          }
          componentDidMount(){
                    this.getRequestedItemList();
          }
          componentWillUnmount(){
                    this.requestref();
          }
          keyExtractor=(item,index)=index.toString()
          renderItem=({item,i})=>{
                    return(
                              <ListItem
                              key={i}
                              title={item.itemName}
                              subTitle={item.reasonToRequest}
                              rightElement={
                                        <TouchableOpacity
                                        onPress ={()=>{
                                                  this.props.navigation.navigate("MyBarter",{"details": item})
                                                }}>
                                                  <Text>
                                                   VIEW         
                                                  </Text>
                                        </TouchableOpacity>
                              }
                              bottomDivider
                              />
                    )
          }
          render(){
                    return(
                              <View>
                              <Header
                              centerComponent="DONATE ITEMS">
                              </Header> 
                              <View>
                              {this.state.requestedItemList.length==0?(<View>
                                        <Text>NO ITEM REQUESTED SO FAR</Text></View>):(
                                                  <FlatList
                                                  keyExtractor={this.keyExtractor}
                                                  data={this.state.requestedItemList}
                                                  renderItem={this.renderItem}
                                                  />
                                        )}      
                              </View>  
                              </View>
                    )
          }
}
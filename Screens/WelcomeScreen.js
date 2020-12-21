import * as React from 'react'
import {View,Text,TouchableOpacity,TextInput, StyleSheet, Alert,Modal,ScrollView} from 'react-native'

export default class WelcomeScreen extends React.Component{

    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            Contact:'',
            Address:'',
            confirmPassword:'',
            isModalVisible:'false',
        }
    }

    userLogIn=(emailId,password)=>{
        firebase.auth().signUpWithEmailandPassword(emailId,password)
        .then((response)=>{
            return Alert.alert("USER LOGGED IN SUCCESSFULLY")
        })
        .catch(function(erroe){
            var errorcode=error.code;
            var errormessage=error.message;
            return Alert.alert(errormessage)
        })
    }

    userSignUp=(emailId,password,confirmPassword)=>{
        if(password !== confirmPassword){
            Alert.alert("PASSWORD DOESN'T MATCH")
        }

        else{
            firebase.auth().createUserWithEmailandPassword(emailId,password)
            .then((response)=>{
                return Alert.alert("USER ADDED SUCCESSFULLY")
            }
            )
            .catch(function(error){
                var errorcode=error.code;
                var errormessage=error.message;
                return Alert.alert(errormessage)
            })
        }
    }

    showModal=()=>{
        return(
           <Modal
           animationType="fade"
           transparent={true}
           visible={this.state.isModalVisible}>
               <View style={StyleSheet.modalContainer}>
                   <ScrollView style={{width:'100%'}}>
                       <KeyboardAvoidingView>
                        <Text>REGISTRATION
                         </Text>   
                         <TextInput
                         placeholder="FIRST NAME"
                         maxLength={10}
                         onChangeText={(Text)=>{
                             this.setState({
                                 firstName: text
                             })
                         }}
                             />
                             <TextInput
                             placeholder="Last Name"
                             maxLength={10}
                             onChangeText={(Text)=>{
                                 this.setState({
                                     lastName: text
                                 })
                             }}
                             />
                             <TextInput
                             placeholder="Contact"
                             keyboardType="number-pad"
                             maxLength={10}
                             onChangeText={(Text)=>{
                                 this.setState({
                                     Contact: text
                                 })
                             }}
                             />
                             <TextInput
                             placeholder="Address"
                             multiline={true}
                             onChangeText={(Text)=>{
                                 this.setState({
                                     Address: text
                                 })
                             }}
                             />
                             <TextInput
                             placeholder="Password"
                             onChangeText={(Text)=>{
                                 this.setState({
                                     password: text
                                 })
                             }}
                             />
                             <TextInput
                             placeholder="Confirm Password"
                             onChangeText={(Text)=>{
                                 this.setState({
                                     confirmPassword: text
                                 })
                             }}
                             />
 
                             <TouchableOpacity
                             onPress={()=>{
                                 this.userSignup(this.state.email,this.state.password.this.state.confirmPassword)}}
                                 >
                                <Text>REGISTER
                                    </Text> 
                             </TouchableOpacity>
                             <TouchableOpacity
                             onPress={()=>{
                             this.setState({
                                 isModalVisible:false
                             })
                             }}>
                                 <Text>
                                     CANCEL
                                 </Text>
                             </TouchableOpacity>
                       </KeyboardAvoidingView>
                 
                   </ScrollView>
 
               </View>
 
           </Modal> 
        )
     }
 

    render(){
        return(
            <View style={styles.App}>

            <Text style={styles.text}>THE BARTER APP</Text>

            <Text style={{color:'white',fontSize:20}}>WHERE EXCHANGING GOODS BECOME EASY!</Text>

            <TextInput
            style={{color:'white', fontSize:15,marginTop:100}}
            placeholder='ENTER E-MAIL!'
            //value={this.state.email}
            onChangeText={(Text)=>{
                this.setState({
                    email: text
                })
            }}
            />

            <TextInput
            style={{color:'white', fontSize:15,marginTop:50}}
            placeholder='ENTER PASSWORD!'
            //value={this.state.password}
            onChangeText={(Text)=>{
                this.setState({
                    password: text
                })
            }}
            />

            <TouchableOpacity
            style={{fontSize:15,fontWeight:'bold'}}
            onPress={this.userLogIn}>
                <Text style={{color:'white',alignSelf:'center',marginTop:20,fontSize:15}}>
                    LOGIN!
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={{fontSize:15,fontWeight:'bold'}}
            onPress={()=>{
                this.usersignup(this.state.email,this.state.password)
                this.setState({
                    isModalVisible: true
                })
            }}

            >
                <Text style={{color:'white',alignSelf:'center',marginTop:20,fontSize:15}}>
                    SIGN UP!
                </Text>
            </TouchableOpacity>

            </View>
        )
    }
}

const styles=StyleSheet.create({
App:{
backgroundColor:"lime"
},

text:{
    color:"white",
    fontWeight:'bold',
    fontSize:50,
    marginTop:-300,
}
})
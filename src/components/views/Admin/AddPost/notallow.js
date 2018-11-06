import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Navigation } from 'react-native-navigation';

import { navigatorDrawer } from '../../../utils/misc';

class NotAllow extends Component {
    constructor(props){
        super(props);

        this.props.navigator.setOnNavigatorEvent((event)=>{
            navigatorDrawer(event, this)
        })

    }

    render(){
        return(
          <View style={{
              flex:1,
              alignItems:'center',
              justifyContent:'center'
          }}>
                <Icon
                    name="frown-o"
                    size={60}
                    color="#F44336"
                />
                <Text>
                    You need to log in or register to post your Events !!!
                </Text>

                <View style={{marginTop:20}}>
                    <Button
                        title="LOGIN / REGISTER"
                        color="#FD9727"
                        onPress={()=>{
                            Navigation.startSingleScreenApp({
                                screen:{
                                screen:"eventsDengun.Login",
                                title:"Login",
                                navigatorStyle:{
                                    navBarHidden:true
                                }
                                }
                            })
                        }}
                    /> 
                </View>
                

          </View>
        )
    }
}

export default NotAllow;

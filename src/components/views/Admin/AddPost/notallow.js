import React, { Component } from 'react';
import { Stylesheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Navigation } from 'react-native-navigation';

import { navigatorDrawer } from '../../../utils/misc';

class NotAllow extends Component {
    constructor(props){
        super(props);

        this.props.navigator.setOnNavigatorEvent((evento)=>{
            navigatorDrawer(evento, this)
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
                name="alert-outline"
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

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';

class SidedrawerComponent extends Component {

    state = {
        isLoading:false,
        buttons:[
            {
                value: "Home",
                iconName: "chip",
                shouldGoto: "eventsDengun.Home",
                typeLink: "tab",
                index: 0,
                privacy: false
            },
            {
                value: "Eventos",
                iconName: "atom",
                shouldGoto: "eventsDengun.AddPost",
                typeLink: "tab",
                index: 1,
                privacy: false
            },
            {
                value: "My posts",
                iconName: "attachment",
                shouldGoto: "eventsDengun.UserPosts",
                typeLink: "view",
                index: [],
                privacy: true
            }
        ]
    }

    button = (button) => (
        <Icon.Button
            key={button.value}
            name={button.iconName}
            backgroundColor="#474143"
            iconStyle={{width:15}}
            color="#ffffff"
            size={18}
            onPress={()=> {
                this.props.navigator.handleDeepLink({
                    link: button.shouldGoto,
                    payload:{
                        typeLink: button.typeLink,
                        indexLink: button.index
                    }
                })
            }}>
            <Text style={styles.buttonText}>
                {button.value}
            </Text>
        </Icon.Button>
    )

    showButtons = (buttons) =>(
        buttons.map( button => (
            !button.privacy ?
                this.button(button)
            :
            this.props.User.userData ?
                this.button(button)
                :null
        ))
    )

    render(){
        return(
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
                {
                    !this.state.isLoading ?
                    <View style={styles.isLoading}>
                        <Icon name="loading" size={30} color="lightgrey"/>
                        <Text style={{color:'lightgrey'}}>Loading....</Text>
                    </View>
                    : null
                }
                {this.showButtons(this.state.buttons)}
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#474143'
    },
    buttonContainer:{
        padding:10,
        marginTop: 20,
    },
    buttonText:{
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        color:'#ffffff'
    },
    isLoading:{
        flex:1,
        alignItems: 'center',
        marginTop:50
    }
})

function mapStateToProps(state){
    return {
        User: state.User
    }
}

export default connect(mapStateToProps, null)(SidedrawerComponent)
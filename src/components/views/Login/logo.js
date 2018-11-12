import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';


class Logo extends Component {

    state = {
        denAnim: new Animated.Value(0),
        gunAnim: new Animated.Value(0)
    }

    componentWillMount(){
        Animated.sequence([
            Animated.timing(this.state.denAnim,{
                toValue:1,
                duration:1000,
                easing:Easing.easeOutCubic
            }),
            Animated.timing(this.state.gunAnim,{
                toValue:1,
                duration:500,
                easing:Easing.easeOutCubic
            })
        ]).start(()=>{
            this.props.showLogin()
        })
    }


    render(){
        return(
           <View>
               <View style={
                    this.props.orientation === "portrait" 
                    ? styles.logoStylesPortrait
                    : styles.logoStylesLandscape
               }>
                    <Animated.View style={{
                        opacity: this.state.denAnim,
                        top: this.state.denAnim.interpolate({
                            inputRange:[0,1],
                            outputRange:[100,0]
                        })
                    }}>
                        <Text style={styles.den}>DEN</Text>
                    </Animated.View>
                    <Animated.View style={{
                        opacity:this.state.gunAnim
                    }}>
                        <Text style={styles.gun}>GUN</Text>
                    </Animated.View>

               </View>
           </View>
        )
    }
}

const styles = StyleSheet.create({ 
    logoStylesPortrait:{
        marginTop:50,
        flex:1,
        flexDirection: 'row',
        maxHeight:100
    },
    logoStylesLandscape:{
        marginTop:20,
        flex:1,
        flexDirection: 'row',
        maxHeight:50
    },
    den:{
        fontSize: 40,
        fontFamily: 'RobotoCondensed-Regular',
        color:'#555555'
    },
    gun:{
        fontSize: 40,
        fontFamily: 'RobotoCondensed-Regular',
        color:'#00ADA9'
    }
})

export default Logo;
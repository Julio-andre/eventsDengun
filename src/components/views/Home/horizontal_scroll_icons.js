import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const categoriesIcons = (value) => {
    let name = '';
    switch(value){
        case 'All':
            name = 'crosshairs';
            break;
        case 'Startup':
            name = 'kickstarter'
            break;
        case 'Software':
            name = 'desktop-mac'
            break;
        case 'Electronics':
            name = 'engine'
            break;
        case 'Conference':
            name = 'gesture-double-tap'
            break;
        case 'Social':
            name = 'hexagon-multiple'
            break;
        case 'Charity':
            name = 'heart-pulse'
            break;
        default:
            name = ''
    }

    return name;
}

class HorizontalScrollIcons extends Component {

    generateIcon = (categories) => (
        categories ? 
            categories.map( item => (
                <View style={{marginRight:15}} key={item}>
                    <Icon.Button
                        name={categoriesIcons(item)}
                        iconStyle={{ marginRight:10, marginLeft: 3}}
                        backgroundColor={
                            this.props.categorySelected !== item ? "#c1c1c1" : "#FF6444"
                        }
                        size={20}
                        borderRadius={100}
                        onPress={()=> this.props.updateCategoryHandler(item)}
                    >
                        <Text style={{
                            color:'#ffffff',
                            marginRight:5
                        }}>{item}</Text>
                    </Icon.Button>
                </View>
            ))
        :null
    )


    render(){
        return(
           <ScrollView
            horizontal={true}
            decelerationRate={0}
            snapToInterval={200}
            showsHorizontalScrollIndicator={false}
           >
                <View style={styles.scrollContainer}>
                   {this.generateIcon(this.props.categories)}
                </View>
           </ScrollView>
        )
    }
}

const styles = StyleSheet.create({ 
    scrollContainer:{
        flex:1,
        flexDirection: 'row',
        padding:10,
        width:'100%'
    }
})

export default HorizontalScrollIcons;
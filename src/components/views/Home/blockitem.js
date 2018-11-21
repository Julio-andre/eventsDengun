import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const BlockItem = (props) => {

    state = {
        bucketImage:null,
        loading:true
    }

    const itemText = (item) => (

        <View style={styles.itemTextContainer}>
            <Text style={styles.itemTextTitle}>
                {item.title}
            </Text>
            <Text style={styles.itemTextDescription}>
                {item.description}
            </Text>
            <Text style={styles.itemTextTitle}>
                {item.location}
            </Text>
            <Text style={styles.itemTextPrice}>
                $ {item.price}
            </Text>
        </View>
    )
   
    //remember to get the uri from, form.image.value.getDownloadUrl() 
    const bucketImage = (url) => (
        
        <View>
             <Image
                resizeMode={"cover"}
                style={styles.bucketImageStyle}
                source={{uri: url}}
                /> 
        </View>
    )

    const block = ({item,i}) => (
        <View style={styles.blockRow}>
            <TouchableOpacity
                onPress={()=> {
                    props.goto(item.blockOne)
                }}
                style={{flex:2}}
            >
                <View
                    style={[
                        styles.blockGridStyle, 
                        styles.blockGridStyleLeft
                    ]}
                >
                    {bucketImage(item.blockOne.image)}
                    {itemText(item.blockOne)}
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> {
                    props.goto(item.blockTwo)
                }}
                style={{flex:2}}
            >
                <View
                     style={[
                        styles.blockGridStyle, 
                        styles.blockGridStyleRight
                    ]}
                >
                    {bucketImage(item.blockTwo.image)}
                    {itemText(item.blockTwo)}
                </View>
            </TouchableOpacity>
        </View>
    )

    return (
       <View>
           {block(props)}
       </View>
    )
}

const styles = StyleSheet.create({ 
    blockRow:{
        flex:1,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between'
    },
    bucketImageStyle:{
        width:'100%',
        height:200,
    },
    itemTextContainer:{
        padding:10,
        borderLeftWidth: 4,
        borderLeftColor: '#FF6444'
    },
    itemTextTitle: {
        fontFamily: 'Roboto-Black',
        color:'#4C4C4C',
        marginBottom: 5
    },
    itemTextDescription: {
        fontFamily: 'Roboto-Black',
        color: '#000000',
        marginBottom: 5
    },
    itemTextPrice: {
        fontFamily: 'Roboto-Black',
        color: '#00ada9',
        marginBottom: 5
    },
    blockGridStyle:{
        backgroundColor: '#f1f1f1'
    },
    blockGridStyleLeft:{
        marginRight: 2.5,
    },
    blockGridStyleRight:{
        marginLeft: 2.5,
    }

})

export default BlockItem;
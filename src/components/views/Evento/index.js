import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    ScrollView,
    Linking
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Evento= (props) => {

    state = {
        bucketImage:null,
        loading:true,
        upload:true
    }

    const bucketImage = () => (
        <View style={{position:'relative'}}>
            <Image
                resizeMode={"cover"}
                style={styles.bucketImageStyle}
                source={{uri:this.state.bucketImage}}
            />
            <Text style={styles.priceTag}>
                € {props.EventoData.price}
            </Text>
        </View>
    )

    const eventoText = () => (
        <View>
            <Text style={styles.eventoTitle}>
                {props.EventoData.title}
            </Text>
            <Text style={styles.eventoDescription}>
                {props.EventoData.description}
            </Text>
            <Text style={styles.eventoTitle}>
                {props.EventoData.location}
            </Text>
        </View>
    )

    const ownerNfo = () => (
        <View style={styles.ownerNfo}> 
            <Text>Contact the owner of this Event to the following mail:</Text>
       
            <Icon.Button
                name="at"
                color="#00ADA9"
                backgroundColor="#ffffff"
                onPress={()=> openEmail()}
            >
                <Text
                    style={{fontSize:20}}
                >{props.EventoData.email}</Text>
            </Icon.Button>
        </View>
    )

    const openEmail = () => {
        Linking.openURL(`mailto://${props.EventoData.email}
        &subject=Regarding ${props.EventoData.title}`)
    }

    return (
        <ScrollView style={styles.eventoContainer}>
            {bucketImage()}
            {eventoText()}
            {ownerNfo()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    eventoContainer: {
        padding:10
    },
    bucketImageStyle:{
        width:'100%',
        height: 250
    },
    priceTag:{
        position:'absolute',
        bottom:0,
        backgroundColor: '#FF6444',
        padding:10,
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'Roboto-Black',
    },
    eventoTitle:{
        fontSize: 30,
        color: '#474143',
        fontFamily: 'Roboto-Black',
        marginTop: 20,
    },
    eventoDescription:{
        marginTop: 20,
        fontSize: 18,
    },
    ownerNfo: {
        marginTop: 30,
        paddingTop: 10,
        borderTopWidth:1,
        borderTopColor:'lightgrey'
    }

 })

export default Evento;
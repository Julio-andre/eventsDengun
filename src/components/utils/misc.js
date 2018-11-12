import {
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

import uuid from 'uuid';

console.disableYellowBox = true;

export const url = `https://firebasestorage.googleapis.com/v0/b/eventsdengun.appspot.com/o/`;

export const FIREBASEURL = `https://eventsdengun.firebaseio.com`;
export const APIKEY = `AIzaSyAi_cuwoPAKc7lrCWn06jhrRHbUkw3Ydjo`;
export const authDomain = `eventsdengun.firebaseio.com`;
export const storageBucket = `eventsdengun.appspot.com`;
export const messagingSenderId = '119427405309';

export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`

export const getOrientation = (value) =>{
    return Dimensions.get("window").height > value ? "portrait" : "landscape" 
}

export const setOrientationListener = (cb) => {
    return Dimensions.addEventListener("change",cb)
}

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change")
}

export const getPlatform = () => {
    if(Platform.OS === 'ios'){
        return "ios"
    } else {
        return "android"
    }
}

export const navigatorDrawer = (event, $this) => {
    if(event.type === "NavBarButtonPress" && event.id === "DrawerButton"){
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        })  
    }
}

export const navigatorDeepLink = (event, $this) =>{
    if(event.type === 'DeepLink'){
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        });

        if(event.payload.typeLink === 'tab'){
            $this.props.navigator.switchToTab({
                tabIndex: event.payload.indexLink
            });
        } else {
            $this.props.navigator.showModal({
                screen: event.link,
                animationType:'slide-horizontal',
                navigatorStyle:{
                    navBarBackgroundColor: '#00ADA9',
                    screenBackgroundColor: '#ffffff'
                },
                backButtonHidden: false
            })
        }
    }
}

export const getTokens = (cb) => {
    AsyncStorage.multiGet([
        '@eventsDengun@authDomain',
        '@eventsDengun@token',
        '@eventsDengun@refreshToken',
        '@eventsDengun@expireToken',
        '@eventsDengun@uid',
    ]).then(value=>{
        cb(value)
    })
}

export const setTokens = (values,cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
        ['@eventsDengun@authDomain', values.auth],
        ['@eventsDengun@token', values.token],
        ['@eventsDengun@refreshToken', values.refToken],
        ['@eventsDengun@expireToken', expiration.toString()],
        ['@eventsDengun@uid', values.uid],
    ]).then( response => {
        cb();
    })
}

export const gridTwoColumns = (list) => {
    let newArticles = [];
    let articles = list;

    let count = 1;
    let vessel = {};

    if(articles){
        articles.forEach( element =>{
            if(count == 1){
                vessel["blockOne"] = element;
                count++;
            } else {
                vessel["blockTwo"] = element;
                newArticles.push(vessel);

                count = 1;
                vessel = {};
            }
        })
    }
    return newArticles;
}
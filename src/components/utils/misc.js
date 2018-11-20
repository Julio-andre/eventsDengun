import {
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

export const firebaseConfig = {
    APIKEY: `AIzaSyAi_cuwoPAKc7lrCWn06jhrRHbUkw3Ydjo`,
    databaseURL: `https://eventsdengun.firebaseio.com`,
    storage: `gs://eventsdengun.appspot.com`,
    projectId: 'eventsdengun',
    messagingSenderId: '119427405309',
};    
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${firebaseConfig.APIKEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${firebaseConfig.APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.APIKEY}`;

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
        ['@eventsDengun@token', values.token],
        ['@eventsDengun@refreshToken', values.refToken],
        ['@eventsDengun@expireToken', expiration.toString()],
        ['@eventsDengun@uid', values.uid],
    ]).then( response => {
        cb();
    })
}

export const gridTwoColumns = (list) => {
    let newEventos = [];
    let eventos = list;

    let count = 1;
    let vessel = {};

    if(eventos){
        eventos.forEach( element =>{
            if(count == 1){
                vessel["blockOne"] = element;
                count++;
            } else {
                vessel["blockTwo"] = element;
                newEventos.push(vessel);

                count = 1;
                vessel = {};
            }
        })
    }
    return newEventos;
}
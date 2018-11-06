import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const navStyle = {
    navBarTextFontSize:20,
    navBarTextColor:'#ffffff',
    navBarTextFontFamily: 'RobotoCondensed-Bold',
    navBarTitleTextCentered: true, // ANDROID ONLY
    navBarBackgroundColor: '#00ADA9'
}

const navLeftButton = (sources) => {
    return {
        title:'Drawer',
        id: 'DrawerButton',
        icon: sources[0],
        disableIconTint: true,
        buttonColor: 'white'
    }
}


const LoadTabs = (allow) => {
    Promise.all([
        Icon.getImageSource('bars',20,'white'),
        Icon.getImageSource('connectdevelop',20,'white'),
        Icon.getImageSource('home',20,'white')
    ]).then( sources => {
        Navigation.startTabBasedApp({
            tabs:[
                {
                    screen:"eventsDengun.Home",
                    label:"Home",
                    title:"Home",
                    icon: sources[2],
                    navigatorStyle:navStyle,
                    navigatorButtons:{
                        leftButtons:[navLeftButton(sources)]
                    }
                },
                {
                    screen: allow ? "eventsDengun.AddPost" : "eventsDengun.NotAllow",
                    label:"DenEvent",
                    title:"DenEvent",
                    icon: sources[1],
                    navigatorStyle:navStyle,
                    navigatorButtons:{
                        leftButtons:[navLeftButton(sources)]
                    }
                }
            ],
            tabsStyle:{
                tabBarButtonColor:'grey',
                tabBarSelectedButtonColor: '#FFC636',
                tabBarTextFontFamily: 'RobotoCondensed-Bold',
                tabBarBackgroundColor: 'white',
                tabBarTranslucent: false
            },
            appStyle:{
                tabBarButtonColor:'grey',
                tabBarSelectedButtonColor: '#FFC636',
                tabBarTextFontFamily: 'RobotoCondensed-Bold',
                tabBarBackgroundColor: 'white',
                navBarButtonColor: '#ffffff',
                keepStyleAcrossPush: true
            },
            drawer:{
                left:{
                    screen: "eventsDengun.SidedrawerComponenent",
                    fixedWidth:500
                }
            }
        })
    })

    
}

export default LoadTabs;
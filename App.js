import { Navigation } from 'react-native-navigation';
import ConfigureStore from './src/components/Store/config';
import { Provider } from 'react-redux';

import Login from './src/components/views/Login';
import Home from './src/components/views/Home';
import AddPost from './src/components/views/Admin/AddPost';
import NotAllow from './src/components/views/Admin/AddPost/notallow';
import SidedrawerComponenent from './src/components/views/Sidedrawer';
import UserPosts from './src/components/views/Admin/UserPosts';
import Article from './src/components/views/Article';

const store = ConfigureStore();

Navigation.registerComponent(
  "eventsDengun.Login",
  ()=>
  Login,
  store,
  Provider
);

Navigation.registerComponent(
  "eventsDengun.Home",
  ()=>
  Home,
  store,
  Provider
);
Navigation.registerComponent(
  "eventsDengun.AddPost",
  ()=>
  AddPost,
  store,
  Provider
);
Navigation.registerComponent(
  "eventsDengun.SidedrawerComponenent",
  ()=>
  SidedrawerComponenent,
  store,
  Provider
);
Navigation.registerComponent(
  "eventsDengun.UserPosts",
  ()=>
  UserPosts,
  store,
  Provider
);
Navigation.registerComponent(
  "eventsDengun.Article",
  ()=>
  Article,
  store,
  Provider
);
Navigation.registerComponent(
  "eventsDengun.NotAllow",
  ()=>
  NotAllow,
  store,
  Provider
);

export default () => Navigation.startSingleScreenApp({
  screen:{
    screen:"eventsDengun.Login",
    title:"Login",
    navigatorStyle:{
      navBarHidden:true
    }
  }
})

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { navigatorDrawer, navigatorDeepLink, gridTwoColumns } from '../../utils/misc';
import HorizontalScroll from './horizontal_scroll_icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { getEventos } from '../../Store/actions/eventos_actions';
import { bindActionCreators } from 'redux';

import BlockItem from './blockitem';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading:true,
      eventos:[],
      categories:['All','Startup','Software','Electronics','Conference','Social','Charity'],
      categorySelected:"All"
    }

    this.props.navigator.setOnNavigatorEvent((evento)=>{
      navigatorDeepLink(evento,this)
      navigatorDrawer(evento,this)
    })
  }

  updateCategoryHandler = (value) =>{
    this.setState({
      isLoading:true,
      categorySelected:value,
      eventos:[]
    });

    this.props.getEventos(value).then(()=>{
      const newEventos = gridTwoColumns(this.props.Eventos.list)

      this.setState({
        isLoading: false,
        eventos: newEventos
      })
    })
  }

  componentDidMount(){
    this.props.getEventos('All').then(()=>{
      const newEventos = gridTwoColumns(this.props.Eventos.list)

      this.setState({
        isLoading: false,
        eventos: newEventos
      })
    })
  }

  goToEventoHandler = (props) =>{
    this.props.navigator.push({
      screen:"eventsDengun.Evento",
      animationType:"slide-horizontal",
      passProps:{
        EventoData: props
      },
      backButtonTitle:'Go Back',
      navigatorStyle:{
        navBarTextFontSize: 20,
        navBarTextColor: '#ffffff',
        navBarTextFontFamily:'RobotoCondensed-Bold',
        navBarBackgroundColor: '#00ADA9',
        screenBackgroundColor: '#ffffff'
      }
    })
  }

  showEventos = () => (
    this.state.eventos.map( (item,i ) => (
      <BlockItem
        key={`columnHome-${i}`}
        item={item}
        iteration={i}
        goto={this.goToEventoHandler}
      />
    ))
  )

  render() {
    return (
        <ScrollView>
          <View style={styles.container}>
            <HorizontalScroll
              categories={this.state.categories}
              categorySelected={this.state.categorySelected}
              updateCategoryHandler={this.updateCategoryHandler}
            />
            {
              this.state.isLoading ?
                <View style={styles.isLoading}>
                  <Icon name="loading" size={30} color="lightgrey"/>
                  <Text style={{color:'lightgrey'}}>Loading....</Text>
                </View>
              :null
            }
            <View style={styles.eventoContainer}>
              <View style={{flex:1}}>
                {this.showEventos()}
              </View>
            </View>

          </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop: 5,
  },
  isLoading:{
    flex:1,
    alignItems: 'center',
    marginTop: 50
  },
  eventoContainer:{
    padding:10,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

function mapStateToProps(state){
  return {
    Eventos: state.Eventos
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getEventos},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
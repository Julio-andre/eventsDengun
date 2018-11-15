import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { navigatorDrawer, navigatorDeepLink, gridTwoColumns } from '../../utils/misc';
import HorizontalScroll from './horizontal_scroll_icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { getArticles } from '../../Store/actions/articles_actions';
import { bindActionCreators } from 'redux';

import BlockItem from './blockitem';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading:true,
      articles:[],
      categories:['All','Startup','Software','Electronics','Conference','Social','Charity'],
      categorySelected:"All"
    }

    this.props.navigator.setOnNavigatorEvent((event)=>{
      navigatorDeepLink(event,this)
      navigatorDrawer(event,this)
    })
  }

  updateCategoryHandler = (value) =>{
    this.setState({
      isLoading:true,
      categorySelected:value,
      articles:[]
    });

    this.props.getArticles(value).then(()=>{
      const newArticles = gridTwoColumns(this.props.Articles.list)

      this.setState({
        isLoading: false,
        articles: newArticles
      })
    })
  }

  componentDidMount(){
    this.props.getArticles('All').then(()=>{
      const newArticles = gridTwoColumns(this.props.Articles.list)

      this.setState({
        isLoading: false,
        articles: newArticles
      })
    })
  }

  goToArticleHandler = (props) =>{
    this.props.navigator.push({
      screen:"eventsDengun.Article",
      animationType:"slide-horizontal",
      passProps:{
        ArticleData: props
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

  showArticles = () => (
    this.state.articles.map( (item,i ) => (
      <BlockItem
        key={`columnHome-${i}`}
        item={item}
        iteration={i}
        goto={this.goToArticleHandler}
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
            <View style={styles.articleContainer}>
              <View style={{flex:1}}>
                {this.showArticles()}
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
  articleContainer:{
    padding:10,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

function mapStateToProps(state){
  return {
    Articles: state.Articles
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getArticles},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
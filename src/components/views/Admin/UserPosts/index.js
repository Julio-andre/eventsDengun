import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';

import { connect } from 'react-redux';
import { getUserPosts, deleteUserpost } from '../../../Store/actions/user_actions';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class UserPosts extends Component {
    static navigatorButtons = {
        leftButtons: Platform.OS === 'ios' ?
        [
            {
                title:'Go back',
                id:'goBack'
            }
        ]
        :null
    }

    constructor(props){
        super(props);

        this.state = {
            isLoading:false,
            imageSource:null,
            posts:[],
            modal:false
        }

        if(Platform.OS === 'ios'){
            this.props.navigator.setOnNavigatorEvent((event)=>{
                if(event.id === 'goBack'){
                    this.props.navigator.dismissAllModals({
                        animationType:'slide-down'
                    })
                }
            })
        }
    }

    componentDidMount(){
        const UID = this.props.User.userData.uid;
        this.props.getUserPosts(UID);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.User.userPosts){
            this.setState({
                posts: nextProps.User.userPosts
            })
        }
    }

    showConfirm = (ID) => {
        this.setState({
            modal:true,
            toDelete:ID
        })
    }

    deletePost = (ID) => {
        this.props.deleteUserpost(ID,this.props.User.userData).then(()=>{
            const UID = this.props.User.userData.uid;
            this.props.getUserPosts(UID);

            this.setState({
                modal:false,
                toDelete:''
            });
        })
    }

    showPosts = (posts) => (
        posts.length > 0 ?
            posts.map( item => (
                <View style={styles.itemWrapper} key={item.id}>
                
                    <View style={styles.imageStyle}>
                    {
                        this.state.isLoading ?
                            <View style={styles.isLoading}>
                                <Icon name="loading" size={30} color="lightgrey"/>
                                <Text style={{color:'lightgrey'}}>Loading....</Text>
                            </View>
                        :null
                    }
                        <Image
                            style={styles.imageStyle}
                            resizeMode={"cover"}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <View style={styles.itemTitle}>
                        <Text style={{
                            fontFamily: 'Roboto-Black'
                        }}>{item.title}</Text>
                    </View>
                    <View style={styles.itemDescription}>
                        <Text>{item.description}</Text>
                        <Text>{item.location}</Text>
                        <View style={{marginTop:10}}>
                            <Text style={styles.small}>PRICE: $ {item.price}</Text>
                            <Text style={styles.small}>CATEGORY: $ {item.category}</Text>
                        </View>
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            onPress={()=> this.showConfirm(item.id)}
                        >
                            <Text
                                style={{
                                    fontFamily:'Roboto-Black',
                                    color: '#F44336',
                                    paddingBottom:10
                                }}>
                                Delete Post
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modal}
                    >
                        <View style={{padding:50}}>

                            <Text style={{fontSize:20}}>
                                Are you sure you want to delete the post ?
                            </Text>

                            <View style={{marginTop:50}}>
                                <TouchableOpacity
                                    onPress={()=> this.deletePost(this.state.toDelete)}
                                >
                                    <Text style={styles.modalDelete}>Delete</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={()=>{
                                        this.setState({
                                            modal:false,
                                            toDelete:''
                                        })
                                    }}
                                >
                                     <Text style={styles.modalClose}>No? keep it</Text>
                                </TouchableOpacity>

                            </View>
                        
                        </View>
                    </Modal>


                </View>
            ))
        :null
    )

    render(){
        //console.log("POSTS: ", this.state.posts)
        return(
           <ScrollView>
               <View style={styles.container}>
                    <View style={{
                        marginBottom:30
                    }}>
                        <Text>You have {this.state.posts.length}</Text>
                    </View>

                    {this.showPosts(this.state.posts)}

               </View>
           </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:10
    },
    itemWrapper:{
        borderWidth:1,
        borderColor: '#ececec',
        borderRadius: 2,
        marginBottom:20
    },
    imageStyle:{
        width:'100%',
        height:200
    },
    itemTitle: {
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        padding:10,
        backgroundColor:'#f5f5f5'
    },
    itemDescription:{
        padding:10
    },
    small:{
        fontSize: 12
    },
    buttons:{
        alignItems: 'center',
    },
    modalDelete:{
        marginBottom:20,
        alignSelf: 'center',
        fontSize: 20,
        color:'#F44336'
    },
    modalClose:{
        marginBottom:20,
        alignSelf: 'center',
        fontSize: 20,
        color:'#00ADA9'
    },
    isLoading:{
        flex:1,
        alignItems:'center',
        marginTop: 50
    }
})


function mapStateToProps(state){
    return {
        User:state.User
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getUserPosts,deleteUserpost},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPosts)
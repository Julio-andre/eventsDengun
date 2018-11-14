import {
    REGISTER_USER,
    SIGN_USER,
    AUTO_SIGN_IN,
    GET_USER_POSTS,
    DELETE_USER_POST
} from '../types';

import axios from 'axios';
import { SIGNUP, SIGNIN ,REFRESH, FIREBASEURL } from '../../utils/misc';
import { setTokens } from '../../utils/misc';

export function signIn(data){
    const request = axios({
        method:"POST",
        url:SIGNIN,
        data:{
            email: data.email,
            password: data.password,
            returnSecureToken:true
        },
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response =>{
        return response.data
    }).catch(e=>{
        return false
    });

    return {
        type: SIGN_USER,
        payload: request
    }

}

export function signUp(data){

    const request = axios({
        method:"POST",
        url:SIGNUP,
        data:{
            email: data.email,
            password: data.password,
            returnSecureToken:true
        },
        headers:{
            "Content-Type":"application/json"
        }
    }).then( response => {
        return response.data
    }).catch(e =>{
        return false
    })

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export const autoSignIn = (refToken) => {

    const request = axios({
        method:"POST",
        url:REFRESH,
        data: "grant_type=refresh_token&refresh_token=" + refToken,
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response => {
        return response.data
    }).catch(e=>{
        return false
    })

    return {
        type: AUTO_SIGN_IN,
        payload: request
    }

}

export function getUserPosts(UID){

    const request = axios(`${FIREBASEURL}/articles.json?orderBy=\"uid\"&equalTo=\"${UID}\"`)
    .then( response => {
        let articles = [];

        for(let key in response.data){
            articles.push({
                ...response.data[key],
                id: key
            })
        }
        return articles
    })
    return {
        type: GET_USER_POSTS,
        payload: request
    }
}

export const uploadImage = (uri, imageName, mime = 'image/jpg') => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
        const imageRef = firebaseApp.storage().ref('posts').child(imageName)
        fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

export const deleteUserpost = (POSTID, USERDATA) => {

    const promise = new Promise((resolve,reject)=>{
        const URL = `${FIREBASEURL}/articles/${POSTID}.json`

        const request = axios({
            method:'DELETE',
            url: `${URL}?auth=${USERDATA.token}s`
        }).then( response => {
            resolve({deletePost:true})
        }).catch(e => {
            const signIn = autoSignIn(USERDATA.refToken);

            signIn.payload.then( response =>{
                let newTokens = {
                    token: response.id_token,
                    refToken: response.refresh_token,
                    uid: response.user_id
                }

                setTokens(newTokens,()=>{
                    axios({
                        method:'DELETE',
                        url: `${URL}?auth=${USERDATA.token}`
                    }).then(()=>{
                        resolve({
                            userData: newTokens,
                            deletePost: true
                        })
                    })
                })
            })
        })
    })

    return {
        type:DELETE_USER_POST,
        payload: promise
    }
}
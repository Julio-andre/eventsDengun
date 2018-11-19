import {
    GET_EVENTOS,
    ADD_EVENTO,
    RESET_EVENTO
} from '../types';

import axios from 'axios';
import { firebaseConfig } from '../../utils/misc';

export function getEventos(category){
    let URL = `${firebaseConfig.databaseURL}/eventos.json`;
    if(category !== 'All'){
        URL = `${URL}/?orderBy=\"category\"&equalTo=\"${category}\"`
    }

    const request = axios(URL)
        .then(response => {
            const eventos = [];

            for(let key in response.data){
                eventos.push({
                    ...response.data[key],
                    id: key
                })
            }
            return eventos;
        })

    return {
        type: GET_EVENTOS,
        payload: request
    }
}

export function addEvento(data,token){

    const request = axios({
        method:'POST',
        url:`${firebaseConfig.databaseURL}/eventos.json?auth=${token}`,
        data
    }).then( response => {
        return response.data
    })

    return {
        type: ADD_EVENTO,
        payload: request
    }
}

export function resetEvento(){
    return {
        type: RESET_EVENTO,
        payload:""
    }
}
import {
    GET_EVENTOS,
    ADD_EVENTO,
    RESET_EVENTO,
} from '../types';

export default function(state={},action){
    switch(action.type){
        case GET_EVENTOS:
            return {...state, list:action.payload}
        case ADD_EVENTO:
            return {...state, newEventos:action.payload}
        case RESET_EVENTO:
            return {...state, newEventos:action.payload }
        default:
            return state;
    }
}
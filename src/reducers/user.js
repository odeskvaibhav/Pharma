import * as actionTypes from '../constants/actionTypes';

export default (state = {}, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.GET_USER_INFO:
            return {...state, ...{currentUser : action.data}};
        default:
            return state;
    }
}
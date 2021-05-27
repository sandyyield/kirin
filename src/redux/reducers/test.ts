
// import { TEST } from '../action_types'
import * as ActionTypes from '../action_types'
import * as Actions from '../actions'

const initState = 'init';

export const Test = (preState = initState, action: Actions.AllInterface) => {
    const { type, data } = action;
    let newState;
    switch (type) {
        case ActionTypes.TEST:
            newState = preState + data;
            return newState;
        case ActionTypes.DEMO:
            newState = preState.length;
            return newState;
        default:
            return preState;
    }
}



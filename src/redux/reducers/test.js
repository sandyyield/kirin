
import { TEST } from '../action_types'

const initState = 'init';

export default function test(preState = initState, action) {
    const { type, data } = action;
    let newState;
    switch (type) {
        case TEST:
            newState = preState + data;
            return newState;
        default:
            return preState;
    }
}
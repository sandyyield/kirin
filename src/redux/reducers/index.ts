//TS中 这个好像不打需要了
// /* 组合一下reducers */
import * as Redux from 'redux'

import * as Reducers from './test'

export default Redux.combineReducers({
    DoTest: Reducers.Test
})


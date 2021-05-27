// import { applyMiddleware, createStore } from 'redux'
import * as Redux from 'redux'

import * as thunk from 'redux-thunk'

import reducers from './reducers'

//redux的拓展测试工具
import * as ReduxDevExt from 'redux-devtools-extension'

export default Redux.createStore(reducers, ReduxDevExt.composeWithDevTools(Redux.applyMiddleware(thunk.default)));


import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

//redux的拓展测试工具
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));


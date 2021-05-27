// import { Button,message } from 'antd'
import { Route, Switch } from 'react-router-dom';

import './App.less';


import Admin from './containers/admin/admin';
import Login from './containers/login/login';

function App() {
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/' component={Admin} />
      {/* <Redirect path='/' to="/login" /> */}
    </Switch>
  );
}

export default App;

// import { Button,message } from 'antd'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.less';

import Admin from './pages/admin/admin';
import Login from './pages/login/login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Admin} />

        <Redirect path='/' to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

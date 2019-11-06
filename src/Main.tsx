import React from 'react';
import {Store} from 'redux';
import { ApplicationState } from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import {History} from 'history'
import Routes from './pages/Routes';

// Main 组件需要传入的属性分别为由 redux 创建的 store,由浏览器历史 history
interface MainProps {
  store: Store<ApplicationState>
  history:History
}

const Main: React.FC<MainProps> = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes history={history}/>
      </ConnectedRouter>
   </Provider>
  );
}

export default Main;

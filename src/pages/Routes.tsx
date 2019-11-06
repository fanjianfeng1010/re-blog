import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { History } from 'history'

import Home from './home/Home'
import Header from './components/Header'
import Detail from './detail/Detail'
import Articles from './article/Articles'
import About from './about/About'

interface IProps {
  history: History
}

const Routes: React.FC<IProps> = ({ history }) => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/article" component={Articles} />
        <Route path="/about" component={About} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  )
}

export default Routes

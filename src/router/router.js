import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Bundle from './Bundle'

import Index from 'bundle-loader?lazy&name=index!../pages/index/index'
import Home from 'bundle-loader?lazy&name=home!../pages/home/index'
import Test from 'bundle-loader?lazy&name=test!../pages/test/index'
import Counter from 'bundle-loader?lazy&name=counter!../pages/counter/index'
import User from 'bundle-loader?lazy&name=user!../pages/user/index'

const Loading = function () {
    return <div>Loading...</div>
}

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
)

const getRouter = () => (
    <Router>
        <div>
            <ul><Link to='/'>首页</Link></ul>
            <ul><Link to='/home'>Home</Link></ul>
            <ul><Link to='/test'>测试Redux，未结合React</Link></ul>
            <ul><Link to='/counter'>测试Redux，结合React</Link></ul>
            <ul><Link to='/user'>测试Redux-thunk</Link></ul>
            <Switch>
                <Route exact path='/' component={createComponent(Index)}/>
                <Route exact path='/home' component={createComponent(Home)}/>
                <Route exact path='/test' component={createComponent(Test)}/>
                <Route exact path='/counter' component={createComponent(Counter)}/>
                <Route exact path='/user' component={createComponent(User)}/>
            </Switch>
        </div>
    </Router>
)

export default getRouter

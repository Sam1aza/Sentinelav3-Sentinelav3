import React from 'react'
import Login from './Login'
import Register from './Register'
import { Route, Redirect,BrowserRouter } from 'react-router-dom'
import App from '../main/App'
import { AuthProvider } from './Auth'
import PrivateRoute from './PrivateRouth'
import Forgot from './Forgot'


const routesLogin = () =>{
    return(
        <AuthProvider>
        <BrowserRouter>
            <Route  path='/login' component={Login} />
            <Route  path='/registrar' component={Register} />
            <Route path='/forgot' component={Forgot}/>
            <PrivateRoute  path='/' component={App} />
        <Redirect from='*' to='/login' />
        </BrowserRouter>
        </AuthProvider>
    )
}

export default routesLogin

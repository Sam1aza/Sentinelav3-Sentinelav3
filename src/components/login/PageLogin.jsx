import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './PageLogin.css'
import RoutesLogin from './RoutesLogin'


export default class PageLogin extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="pageLogin">
                    <RoutesLogin />
                </div>
            </BrowserRouter>
        )
    }
}
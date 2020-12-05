import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'


import Logo from '../template/Logo'
import Nav from '../template/Nav'
import Footer from '../template/Footer'
import Routes from './Routes'


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Logo />
                    <Nav />
                    <Routes />
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}





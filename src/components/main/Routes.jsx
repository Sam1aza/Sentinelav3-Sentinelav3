import React from 'react'

import Home from '../home/Home'
import Glicose from '../input/GlicoseInput'
import PressaoArterial from '../input/PressãoArterialInput'
import Medicacao from '../input/Medicacao'

import { Switch, Route, Redirect } from 'react-router-dom'
import History from '../history/History'



export default props =>

    <Switch>
        <Route exact path='/home' component={Home} />
        <Route  path='/glicose' component={Glicose} />
        <Route  path='/pressao' component={PressaoArterial} />
        <Route  path='/medicacao' component={Medicacao} />
        <Route  path='/acervo' component={History}/>
        <Redirect from='*' to='/home' />
    </Switch>

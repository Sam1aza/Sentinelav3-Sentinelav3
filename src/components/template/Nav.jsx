import "./Nav.css"
import React from 'react'
import {Link} from 'react-router-dom'

import fire from '../firebaseScript/FirebaseUtils'

export default props =>
    <aside className="menu-area">
        <div className='divdouser'>
            <label className="userLogged">Olá, {fire.auth().currentUser.displayName}!</label>
            <button className="btnuser btn btn-outline-danger btn-sm" onClick={() => fire.auth().signOut()}>Sair</button>
        </div>
        
        <nav className="menu">
            {/*Usar o header como exemplo usando outro componente*/ }
            <Link to="/home">
                <i className="fa fa-home"></i> Inicio
            </Link>
            <Link to="/glicose">
                <i className="fa fa-tint"></i> Glicose
            </Link>
            <Link to="/pressao">
                <i className="fa fa-heartbeat"></i> Pressão/Batimentos
            </Link>
            <Link to="/medicacao">
                <i className="fa fa-dot-circle-o"></i> Medicação
            </Link>
            <hr/>
            <Link to="/acervo">
                <i className="fa fa-history"></i> Historico
            </Link>
            
        </nav>
    </aside>
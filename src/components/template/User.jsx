import "./User.css"
import React from 'react'

import fire from '../firebaseScript/FirebaseUtils'

export default props =>
    <header className="user">
            <button className="btnsignon btn btn-light" onClick={() => fire.auth().signOut()}>Deslogar</button>        
    </header>
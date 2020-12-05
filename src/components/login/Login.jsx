import React, { useCallback,useContext } from 'react'
import logo from '../../assets/imgs/logo-white.png'
import './Login.css'
import { Link, Redirect, withRouter } from 'react-router-dom'

import fire from '../firebaseScript/FirebaseUtils'
import { AuthContext } from './Auth'


const Login = ({history}) =>{
    const handleLogin = useCallback(
        async event => {
            event.preventDefault()
            const {email,password} = event.target.elements
            try{
                await fire
                .auth()
                .signInWithEmailAndPassword(email.value,password.value)
                history.push("/")
            }catch(error){
                if(error.code === "auth/invalid-email"){
                    alert("Campo de email em branco ou invalido")
                }else if(error.code == "auth/wrong-password"){
                    alert("Senha de acesso invalida")
                }else{
                    alert("Verificar email/senha de acesso")
                }                
            }
        },
        [history]
    )

    const {currentUser} = useContext(AuthContext)

    if(currentUser){
        return <Redirect to="/"/>
    }

    return (
        <div className="logoPosIni">
            <img src={logo} alt="logo" className="logoPagInicial" />
            <p >Sentinela</p>
            <div className="paginicial col">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="nameInput">Email</label>
                        <input className="emailinput form-control" type="email" placeholder="E-mail" name='email'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="idadeInput">Senha</label>
                        <input className="senhainput form-control" type="password" placeholder="Senha" name='password'/>
                    </div>
                    <button className="btnlogin btn btn-primary col">Logar</button>
                </form>
                <div>
                    <Link to="/registrar">
                    <button className=" btn btn-secondary col" >Cadastrar</button>
                    </Link>
                    <Link to="/forgot">
                    <button className=" btn btn-link col">Esqueci a senha</button>
                    </Link>
                </div>
            </div>
        </div>            
)
}

export default withRouter(Login)














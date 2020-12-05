import React, { useCallback } from 'react'
import './Register.css'
import {Link, withRouter} from 'react-router-dom'

import fire from '../firebaseScript/FirebaseUtils'


const SignUp = ({history}) => {
    const handleSignUp = useCallback(async event=>{
        event.preventDefault()
        const {name,email,password,repassword} = event.target.elements
        if(password.value === repassword.value){
            try{
                await fire
                .auth()
                .createUserWithEmailAndPassword(email.value,password.value)
                history.push("/home")
                fire.auth().currentUser.updateProfile({displayName:name.value})
            }catch(error){
                alert(error)
            }
        }else{
            alert("As senhas informadas não correspondem")
        }
        fire.auth().currentUser.updateProfile({
            displayName:name.value
        })

    },[history])

    return (
        <div>           
            <h2>Cadastrar usuario no Sentinela</h2>
            <div className="paginicial">
                <form onSubmit={handleSignUp}>
                    <div className="form-group ">
                        <label htmlFor="nameid">Nome</label>
                        <input className="form-control" type="text" placeholder="Nome" name='name' id='nameid'
                            />
                    </div>
                    <div className="form-group ">
                        <label htmlFor="">Email </label>
                        <input className="form-control" type="email" placeholder="E-mail" name='email'
                         />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Senha</label>
                        <input className="form-control" type="password" placeholder="Senha" name='password' 
                         />
                        <small id="emailHelp" class="form-text text-muted">Minimo 6 caracteres</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Repetir a senha</label>
                        <input className="form-control" type="password" placeholder="Repetir a senha" name='repassword'
                        />
                    </div>
                    <button className=" btn btn-success col" type="submit">Cadastrar</button>
                </form>
                
                <div>
                    <Link to="/login">
                    <button className=" btn btn-link col">Voltar a tela de login</button>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default withRouter(SignUp)

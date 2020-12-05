import React,{useCallback} from 'react'
import {Link, withRouter} from 'react-router-dom'

import fire from '../firebaseScript/FirebaseUtils'

const Forgot = ({history}) =>{
    const handleForgot = useCallback(
        async event => {
            event.preventDefault()
            const {email} = event.target.elements
            try{
                await fire
                .auth()
                .sendPasswordResetEmail(email.value)
                history.push("/login")
                alert("Mensagem enviada com sucesso")
            }catch(error){
                alert(error)              
            }
        },
        [history]
    )


return(
    <div>           
            <h2>Recuperar senha de acesso</h2>
            <div className="paginicial">
                
                <form onSubmit={handleForgot}>
                    <div className="form-group ">
                        <label htmlFor="emailid">Email para recuperar a senha</label>
                        <input className="form-control" type="email" placeholder="Email" name='email' id='emailid'
                            />
                    </div>
                    <button className="btn btn-dark col" type="submit">Recuperar</button>
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

export default withRouter(Forgot)
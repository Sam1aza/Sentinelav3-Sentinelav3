import React from 'react'
import { Component } from 'react'
import Main from '../template/Main'
import './Home.css'

import fire from '../firebaseScript/FirebaseUtils'


const initialState = {
    apontamento: {
        glicose: '',
        pressao: '',
        batimento: '',
        observacao: ''
    },
    medicacao: {
        carbamazepina: ''
    },
    user:{}
}

const checkboxProps = {
    disabled: false
}





export default class UserInput extends Component {

    state = { ...initialState }
    checkboxProps = { ...checkboxProps }

    constructor() {
        super()
        this.clear = this.clear.bind(this)
        this.saveApointment = this.saveApointment.bind(this)
    }

    componentDidMount() {
        fire.database().ref("medicamentos").once('value').then(snap => {
            this.setState({ medicacao: snap.val() })
        }) 
        const fireuser = fire.auth().currentUser
        fire.auth().onAuthStateChanged(function(fireuser){
            var displayName = fireuser.displayName;
        })
        
        
    }


    updateFormApointment(event) {
        const apontamento = this.state.apontamento
        apontamento.data = new Date().toLocaleDateString()
        apontamento.hora = new Date().toLocaleTimeString()
        apontamento.usuario = fire.auth().currentUser.displayName
        apontamento[event.target.name] = event.target.value
        this.setState({ apontamento })
    }

    updateFormMedicine(event) {
        const decrease = 1
        const medicacao = this.state.medicacao
        medicacao[event.target.name] = medicacao[event.target.name] - decrease
        this.setState({ medicacao })
        const checkboxProps = !this.checkboxProps.disabled
        this.setState({ checkboxProps: checkboxProps })
        console.log(medicacao, checkboxProps)
    }

    saveApointment() {
        if (this.state.apontamento.glicose === '') {
        } else {
            const apontamento = this.state.apontamento
            const dbFirebase = fire.database().ref("apontamentos")
            dbFirebase.push(apontamento)
            this.saveMedicine()
        }
        this.clear()
    }

    saveMedicine() {
        const medicacao = this.state.medicacao
        const dbFirebase = fire.database().ref("medicamentos")
        dbFirebase.set(medicacao)
    }


    clear() {
        this.setState({
            apontamento: {
                glicose: '',
                pressao: '',
                batimento: '',
                observacao: '',
                apidra: '',
                basaglar: ''
            }
        })
    }



    render() {
        return (
            <Main icon="home" title=" Inicio " subtitle="Sentinela versão web">
                <div className="dysplay-4">Painel inicial para apontamento das medicações e medições</div>
                <hr />
                <h4>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()} </h4>
                <div className="row">
                    <div className="glicoseform form-group col">
                        <label htmlFor="nameInput">Glicose mg/dl</label>
                        <input className="emailinput form-control" name='glicose' value={this.state.apontamento.glicose}
                            onChange={e => this.updateFormApointment(e)} type="number" min="0"/>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="idadeInput">Pressão arterial</label>
                        <input className="senhainput form-control" name='pressao' value={this.state.apontamento.pressao}
                            onChange={e => this.updateFormApointment(e)} type="number" />
                    </div>
                    <div className="form-group col">
                        <label htmlFor="idadeInput">Batimento cardiaco</label>
                        <input className="senhainput form-control" name='batimento' value={this.state.apontamento.batimento}
                            onChange={e => this.updateFormApointment(e)} type="number" min="0" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="idadeInput">Observação</label>
                        <input className="senhainput form-control" name='observacao' value={this.state.apontamento.observacao}
                            onChange={e => this.updateFormApointment(e)} type="text" min="0" />
                    </div>
                </div>
                <hr />
                <fieldset>
                    <div className="row">
                        <div className="formToCheck custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="carbamazepina" name='carbamazepina' onChange={e => this.updateFormMedicine(e)}
                                disabled={checkboxProps.disabled}
                                valor="codificação" /><label className="custom-control-label" htmlFor="carbamazepina"> Carbamazepina </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="risperidona" name='risperidona' onChange={e => this.updateFormMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="risperidona"> Risperidona </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="brilinta" name='brilinta' onChange={e => this.updateFormMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="brilinta"> Brilinta </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="losartana" name='losartana' onChange={e => this.updateFormMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="losartana"> Losartana </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="concor" name='concor' onChange={e => this.updateFormMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="concor"> Concor </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="zimpas" name='zimpas' onChange={e => this.updateFormMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="zimpas"> Zimpas </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="lasix" name='lasix' onChange={e => this.updateFormMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="lasix"> Lasix </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="aas" name='aas' onChange={e => this.updateFormMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="aas"> AAS </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="aldactone" name='aldactone' onChange={e => this.updateFormMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="aldactone"> Aldactone </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="ancorom" name='ancorom' onChange={e => this.updateFormMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="ancorom"> Ancorom </ label>
                        </div>
                    </div>
                </ fieldset>
                <hr />
                <div className="botoesAcao">
                    <button className="btnsalvar btn btn-primary" onClick={this.saveApointment}>Salvar</button>
                    <button className="btnlimpar btn btn-warning" onClick={this.clear}>Limpar</button>                 
                    
                </div>
               
                <hr />
            </Main>
        )
    }
}


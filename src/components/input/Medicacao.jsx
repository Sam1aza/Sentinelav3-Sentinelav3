import React, { Component } from 'react'
import Main from '../template/Main'
import './Medicacao.css'

import fire from '../firebaseScript/FirebaseUtils'

const initialState = {
    apontamento: {
        glicose: '',
        pressao: '',
        batimento: '',
        observacao: ''
    },
    medicacao: {

    }
}

const stateinitial = {
    medicacaoAux:{}
}


const daysUntilEnd = {
    dataFinal: {
        carbamazepina: ''
    }
}

const increaseMedicine = {
    qtdToIncrease: {
        qtd: 0
    }
}

export default class Medicacao extends Component {


    constructor() {
        super()
        this.saveIncreaseMedicine = this.saveIncreaseMedicine.bind(this)
        this.clearInput = this.clearInput.bind(this)
    }

    state = { ...initialState }
    days = { ...daysUntilEnd }
    status = { ...increaseMedicine }
    medState = {...stateinitial}


    componentDidMount() {
        fire.database().ref("medicamentos").once('value').then(snap => {
            this.setState({ medicacao: snap.val() })
        })
    }

    updateStockMedicine(event) {
        const increase = this.status.qtdToIncrease.qtd
        const increasenum = parseInt(increase)
        const medicacaoAux = this.state.medicacao
        medicacaoAux[event.target.name] = medicacaoAux[event.target.name] + increasenum
        this.setState({ medicacaoAux })
    }

    qtdToUpdateMedicine(event) {
        const qtdToIncrease = this.status.qtdToIncrease
        qtdToIncrease[event.target.name] = event.target.value
        this.setState({ qtdToIncrease })
    }

    saveIncreaseMedicine() {
        const medicacao = this.state.medicacao
        const dbFirebase = fire.database().ref("medicamentos")
        dbFirebase.set(medicacao)
        this.clearInput()
    }

    clearInput() {
        const qtdToIncrease = this.status.qtdToIncrease
        qtdToIncrease.qtd = 0
        this.setState({ qtdToIncrease })
    }




    render() {
        return (
            <Main icon="dot-circle-o" title=" Medicamentos" subtitle="Sentinela versão web">
                <div className="dysplay-4">Painel do estoque atual de medicamentos, dosagem e aplicação</div>
                <hr />

                <div>
                    <table className="table table-hover table-responsive-sm table-sm table-borderless1">
                        <thead className="thead-dark">
                            <tr >
                                <th>Medicação</th>
                                <th>Descrição</th>
                                <th>Dosagem</th>
                                <th>Frequencia</th>
                                <th>Estoque</th>

                            </tr>
                            <tr>
                                <td>Carbamazepina</td>
                                <td>Carbamazepina</td>
                                <td>200	Mlg</td>
                                <td>Manhã e noite</td>
                                <td><strong>{this.state.medicacao.carbamazepina}</strong></td>


                            </tr>
                            <tr>
                                <td>Risperidona</td>
                                <td>Risperidona</td>
                                <td>1 Mlg</td>
                                <td>Manhã e noite</td>
                                <td><strong>{this.state.medicacao.risperidona}</strong></td>

                            </tr>
                            <tr>
                                <td>Brilinta</td>
                                <td>Brilinta</td>
                                <td>90 Mlg</td>
                                <td>Manhã e noite</td>
                                <td><strong>{this.state.medicacao.brilinta}</strong></td>


                            </tr>
                            <tr>
                                <td>Losartana (Aradois)</td>
                                <td>Losartana (Aradois)</td>
                                <td>25 Mlg</td>
                                <td>Manhã e noite</td>
                                <td><strong>{this.state.medicacao.losartana}</strong></td>

                            </tr>
                            <tr>
                                <td>Concor</td>
                                <td>Concor</td>
                                <td>2.5 Mlg</td>
                                <td>Manhã</td>
                                <td><strong>{this.state.medicacao.concor}</strong></td>

                            </tr>
                            <tr>
                                <td>Zimpas </td>
                                <td>Zimpas </td>
                                <td>10 Mlg</td>
                                <td>Manhã</td>
                                <td><strong>{this.state.medicacao.zimpas}</strong></td>

                            </tr>
                            <tr>
                                <td>Lasix</td>
                                <td>Lasix</td>
                                <td>40 Mlg</td>
                                <td>Manhã</td>
                                <td><strong>{this.state.medicacao.lasix}</strong></td>

                            </tr>
                            <tr>
                                <td>AAS</td>
                                <td>AAS</td>
                                <td>100	Mlg</td>
                                <td>Tarde</td>
                                <td><strong>{this.state.medicacao.aas}</strong></td>

                            </tr>
                            <tr>
                                <td>Aldactone</td>
                                <td>Aldactone</td>
                                <td>25 Mlg</td>
                                <td>Tarde</td>
                                <td><strong>{this.state.medicacao.aldactone}</strong></td>

                            </tr>
                            <tr>
                                <td>Ancorom(Clori. Amid.)</td>
                                <td>Ancorom(Clori. Amid.)</td>
                                <td>200 Mlg</td>
                                <td>Tarde</td>
                                <td><strong>{this.state.medicacao.ancorom}</strong></td>

                            </tr>
                        </thead>

                    </table>
                    <hr />
                    <legend>Foi realizado a compra de algum dos medicamentos abaixo?</legend>
                    <label>Qual a quantidade adquirida?</label>
                    <input className="form-control col-md-1" min="0" type="number" name='qtd' value={this.status.qtdToIncrease.qtd} onChange={e => this.qtdToUpdateMedicine(e)} />
                    <br />
                    <div >
                        <label>Qual a medicação adquirida?</label>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="carbamazepina" name='carbamazepina' onChange={e => this.updateStockMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="carbamazepina"> Carbamazepina </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="risperidona" name='risperidona' onChange={e => this.updateStockMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="risperidona"> Risperidona </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="brilinta" name='brilinta' onChange={e => this.updateStockMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="brilinta"> Brilinta </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="losartana" name='losartana' onChange={e => this.updateStockMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="losartana"> Losartana </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="concor" name='concor' onChange={e => this.updateStockMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="concor"> Concor </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="zimpas" name='zimpas' onChange={e => this.updateStockMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="zimpas"> Zimpas </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="lasix" name='lasix' onChange={e => this.updateStockMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="lasix"> Lasix </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="aas" name='aas' onChange={e => this.updateStockMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="aas"> AAS </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="aldactone" name='aldactone' onChange={e => this.updateStockMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="aldactone"> Aldactone </ label>
                        </div>
                        <div className="custom-control custom-checkbox col">
                            <input className="custom-control-input" type="checkbox" id="ancorom" name='ancorom' onChange={e => this.updateStockMedicine(e)}
                                valor="codificação" /><label className="custom-control-label" htmlFor="ancorom"> Ancorom </ label>
                        </div>
                    </div>
                    <button className="btnsalvar2 btn btn-outline-info" onClick={this.saveIncreaseMedicine}>Adicionar</button>
                </div>
            </Main>

        )

    }
}



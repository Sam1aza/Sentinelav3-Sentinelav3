import React, { Component } from 'react'
import Main from '../template/Main'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor';


import fire from '../firebaseScript/FirebaseUtils'


import paginationFactory from 'react-bootstrap-table2-paginator';


const initialState = {
    rows: [],
    dados:[{}]
}


    

const columns = [
    { dataField: "data", text: 'Data', sort:true },
    { dataField: 'hora', text: 'Hora' },
    { dataField: 'pressao', text: 'Pressão arterial' },
    { dataField: 'batimento', text: 'Batimento' },
    { dataField: 'observacao', text: 'Observação' },
    {dataField:'usuario',text:'Registrado por'}
]

const cellEdit = cellEditFactory({
    mode: 'click',
})



export default class PressaoArterial extends Component {

    state = { ...initialState }



    constructor() {
        super()
        this.app = fire
        this.database = this.app.database().ref("apontamentos")
        this.dados = {...initialState.dados}

    }

    componentDidMount() {
        this.database.once('value').then(snap => {
            this.setState({ rows: snap.val() })
            this.convertObjToArray()
        })
    }

    convertObjToArray() {
        const arrayOfObjects = [];
        const nested = { ...this.state.rows }
        for (const prop in nested) {
            if (nested.hasOwnProperty(prop)) {
                arrayOfObjects.push(nested[prop]);
            }
        }
        arrayOfObjects.reverse()
        this.setState({ dados: arrayOfObjects })
    }



    render() {
        return (
            <Main icon="heartbeat" title=" Pressão arterial e batimentos" subtitle="Sentinela versão web">
                <div className="dysplay-4">Painel para monitoramento das medições da pressão arterial e batimento cardiaco</div>
                <hr/>
                <BootstrapTable
                    hover
                    keyField="pressao"
                    data={this.state.dados}
                    columns={columns}
                    pagination={paginationFactory()}
                    cellEdit={cellEditFactory(cellEdit)}
                />
            </Main>
        )
    }

}
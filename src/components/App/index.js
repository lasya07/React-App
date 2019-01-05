import React from "react";
import Hello from "./incrementer/index";
import Incrementer from "./incrementer/index";
import Table from "./table/index";
import View from "./view/index";
import Form from "./form/index"

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

const tableHeaders=['Id', 'Name', 'Alias', 'Team'];

class App extends React.Component {
    
    constructor(props) {
        super(props)
        this.createRecord = this.createRecord.bind(this)
    }
    state = {
        tableValues: []                          
    }
    fetchList() {
        let self = this;
        const request = new Request('/heroes',{method: 'GET', headers: {"content-type": "application/json"}});                                    
        fetch(request)
        .then(res => res.json())
        .then(function(data){
            self.setState({'tableValues': data});
        });
    }

    componentDidMount() {
        this.fetchList()
    }

    createRecord(name, alias, team) {
        const self = this;
        var body = {
            name: name,
            alias: alias,
            team: team
        };
        console.log(name, alias,team)
        var request = new Request('/heroes',{
        method: 'POST', 
        body: JSON.stringify(body),
        headers:{
            'content-type': 'application/json'
        }
    });
        fetch(request)
        .then(function(){
            self.fetchList();
        });
    }

   
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path = "/List" render = {(props) => {
                        return <Table 
                                    values = {this.state.tableValues} 
                                    headers = {tableHeaders} 
                                    history = {props.history} />                                  
                    }}/>

                    <Route exact path = "/View/:id" component = {View}/>

                    <Route exact path = "/Create" render = { (props) => {
                        
                        return <Form 
                        formSubmitCallback = {this.createRecord}
                        history = {props.history}/>
                    }}/>

                    <Redirect to = "/List" />
                </Switch>                                                                   
            </Router>

        );
    }
} 

export default App;

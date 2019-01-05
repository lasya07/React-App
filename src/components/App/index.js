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
    state = {
        tableValues: [
            ['101', 'Tony Stark', 'Iron Man', 'Avengers'],
            ['102','Peter Parker', 'Spider Man', 'Avengers'],
            ['103','Bruce Mayne', 'Bat Man', 'Justice League']
        ]
               
    }

    constructor(props) {
        super(props)
        this.createRecored = this.createRecored.bind(this)
    }
    createRecored(name, alias, team) {
        console.log(name, alias, team)
        const ID = Math.random() * 100
        const newRecord = [ID, name, alias, team]
        const newTableValues = [...this.state.tableValues]
        newTableValues.push(newRecord)
        this.setState({tableValues: newTableValues})
        
    }
   
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path = "/List" render = { (props) => {
                        return <Table 
                                    values = {this.state.tableValues} 
                                    headers = {tableHeaders} 
                                    history = {props.history} />                                  
                    }}/>

                    <Route exact path = "/View/:id" render = { (props) => {
                        console.log(props)
                        const data = this.state.tableValues.find(val => val[0] === props.match.params.id)
                        const newRecord = {
                            name: data[1],
                            alias: data[2],
                            team: data[3]
                        }
                        return <View 
                                name = {newRecord.name} 
                                alias = {newRecord.alias} 
                                team = {newRecord.team} />
                    }}/>

                    <Route exact path = "/Create" render = { (props) => {
                        
                        return <Form 
                        formSubmitCallback = {this.createRecored}
                        history = {props.history}/>
                    }}/>

                    <Redirect to = "/List" />
                </Switch>                                                                   
            </Router>

        );
    }
} 

export default App;

import React from 'react'
import { Provider } from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import routes from './routes'


export default class App extends React.Component{
	constructor(){
		super()
	}

	render(){
		return(
            <Switch>
                {routes.map((route,i) => <Route key={i} {...route} /> )}
            </Switch>
		)
	}
}
import path from 'path'
import React from 'react'
import { renderToString } from "react-dom/server"
import App from '../shared/App'

import express from 'express'

import compression from 'compression'
import helmet from 'helmet'
import { StaticRouter, matchPath } from 'react-router-dom'
import serialize from 'serialize-javascript'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../shared/reducers'
import routes from '../shared/routes'
import Thunk from 'redux-thunk'


let nodeApp = express();
nodeApp.use(helmet());

// CONFIGURATIONS
nodeApp.set('port', '8080');

// MIDDLEWARE
nodeApp.use(compression());
nodeApp.use(express.static(path.join('./', 'public')));

nodeApp.use('*', (req, res) => {
	const middleware = applyMiddleware(Thunk)
	const store = createStore(reducer, middleware);
	let urlParams = undefined
	const currentRoute = routes.find( route => {
		let matchedRoute = matchPath(req.originalUrl.split('?')[0], route)
		console.log(matchedRoute)
		if(matchedRoute)
			urlParams = matchedRoute.params
		return matchedRoute
	})
	let currentComponent = undefined
	try{	
		currentComponent = currentRoute.component
	}catch(err){
		res.send('Error 404');
		return
	}
	const baseUrl = req ? `${req.protocol}:\/\/${req.get('Host')}` : '';

	const componentInitialDataPromise = currentComponent.requestInitialdata({dispatch:store.dispatch,baseUrl,urlParams}) || Promise.resolve()

	componentInitialDataPromise
	.then(()=>{
		const context = {}

		const preloadedState = store.getState()

		const markup =  renderToString(
						<Provider store={store}>
						  	<StaticRouter location={req.originalUrl} context={context}>
						  	<App />
						  	</StaticRouter>
					  	</Provider>
					  	)

	    res.send(`
	    	<!DOCTYPE html>
			<html class="no-js ob-anim" class="cssanimations" data-language="en_SG" lang="en">
			<head>
			  <meta charset="UTF-8">
			  <title>TwitSplit</title>
			  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
			  <link rel="stylesheet" media="all" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>

			  <link rel="stylesheet" media="all" href="/css/style.css"/>
			</head>
			<body>
				<script>window.__initialData__=${serialize(preloadedState)} </script>
			  	<div id="root">${markup}</div>
			 	<script type="text/javascript" src="/js/bundle.js" charset="utf-8"></script>
			</body>
			</html>
	    `)

		
	})


});


// ERROR-HANDLING
nodeApp.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// eslint-disable-next-line no-unused-vars
nodeApp.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(
        err.message
        );
});


nodeApp.listen(process.env.PORT || 8080 , ()=>{
	console.log('server is running ' + (process.env.PORT || 8080))
})

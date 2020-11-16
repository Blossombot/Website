import React, { Component, Fragment as Frag } from 'react';

class NotFoundPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		//frags are only used when you're putting multiple
		//html elements or components next to each other,
		//without them being in a container
		//so you just need the outside div here
		//and not the <Frags> wrapping it
		return (
			<div className="App-contentContainer App-animate-fade-in">
				<h1>404</h1>
				<p>Page not found</p>
			</div>
		);
	}
}

export default NotFoundPage;
import React, { Component, Fragment as Frag } from 'react';
import {ReactComponent as Link} from './link.svg';

const url_regex = new RegExp(/(https?):\/\/[^\s$.?#].[^\s]*/g);

class TermCard extends Component {
	constructor(props) {
		super(props);
		this.state = { term: this.props.term };
	}

	copy = (text) => {
		var field = document.createElement('input');
		document.body.appendChild(field);
	    field.setAttribute('value', text);
	    field.select();
	    document.execCommand("copy");
	    document.body.removeChild(field);
	    this.setState({copied: true});
	    setTimeout(() => this.setState({copied: false}), 3000);
	}

	render() {
		var term = this.state.term;
		var source = term.source.replace(url_regex, (match, ...args) => {
		  if(match.endsWith(`)`)) {
		    match = match.slice(0, -1); //cut off the trailing parenthesis
		    return `<a href=${match}>${match}</a>)`; //add it back outside the <a>
		  }

		  return `<a href=${match}>${match}</a>`
		});
		source = '<strong>Source: </strong> '+source;

		return (
			<div className="App-termCard App-animate-fade-in">
				<div className="title">
					<h3><a href={`/term/${encodeURIComponent(term.names[0])}`}>{term.names[0]}</a></h3>
					<Link className={`App-shareButton${this.state.copied ? ' copied' : ''}`} onClick={() => this.copy(`${window.location.origin}/term/${term.id}`)} />
				</div>
				<p className="definition">{term.definition}</p>
				{term.source && (
					<p className="source" dangerouslySetInnerHTML={{__html: source}} />
				)}
			</div>
		);
	}
}

export default TermCard;
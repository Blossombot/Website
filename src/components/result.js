import React, { Component, Fragment as Frag } from 'react';
import {ReactComponent as Link} from './link.svg';

const url_regex = new RegExp(/(https?):\/\/[^\s$.?#].[^\s]*/g);

class SearchResult extends Component {
	constructor(props) {
		super(props);

		var term = this.props.term;
		if(term.source) {
			term.source = term.source.replace(url_regex, (match, ...args) => {
			if(match.endsWith(`)`)) {
			match = match.slice(0, -1); //cut off the trailing parenthesis
			return `<a href=${match}>${match}</a>)`; //add it back outside the <a>
			}

			return `<a href=${match}>${match}</a>`
			});
		}

		for(var prop of ['definition', 'names', 'source']) {
			if(!term[prop]) continue;
			if (prop == 'names') {
				term.synonyms = term[prop].slice(1).join(", ").replace(/\[\/?MATCH\]/g, "");;
				term.name = term[prop][0].replace(/\[\/?MATCH\]/g, "");
				term.url = term.name.replace(/\[\/?MATCH\]/g, "");
			}
			else {
				term[prop] = term[prop].replace(/\[\/?MATCH\]/g, (match, ...args) => {
					if (match.includes("/")) return "</span>"
					else return '<span class="highlight">'
				})
            }
		}

		this.state = { term };
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
		return (
			<div className="App-result App-animate-fade-in">
				<div className="title">
					<h3 dangerouslySetInnerHTML={{__html: `<a href="/term/${encodeURIComponent(term.url)}">${term.name}</a>`}} />
					<Link className={`App-shareButton${this.state.copied ? ' copied' : ''}`} onClick={() => this.copy(`${window.location.origin}/term/${term.id}`)} />
				</div>
				<p className="definition" dangerouslySetInnerHTML={{__html: term.definition}}/>
				{term.synonyms && <p className="synonyms" dangerouslySetInnerHTML={{__html: '<strong>Synonyms:</strong> '+term.synonyms}} />}
				{term.source && (
					<p className="source" dangerouslySetInnerHTML={{__html: '<strong>Source:</strong> '+term.source}} />
				)}
			</div>
		);
	}
}

export default SearchResult;
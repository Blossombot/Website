import React, { Component, Fragment as Frag } from 'react';
import axios from 'axios';

import TermCard from '../components/termcard';

const url_regex = new RegExp(/(https?):\/\/[^\s$.?#].[^\s]*/g);

class TermPage extends Component {
    constructor(props) {
        super(props);

        this.state = { err: {} };
    }

    async componentDidMount() {
        var term = this.props.match.params.term;
        try {
            var data = await axios(`/api/v1/terms/${term}`);
        } catch (e) {
            return this.setState({ err: { message: e.message } });
        }

        this.setState({ term: data.data })
    }

    render() {
        if (this.state.err && this.state.err.message) {
            let err = this.state.err;
            if (err.message.includes("404")) {
                return (
                    <div className="App-contentContainer App-animate-fade-in">
                        <h1>Not Found</h1>
                        <p>Sorry! That term wasn't found :(</p>
                    </div>
                );
            }

            return (
                <div className="App-contentContainer App-animate-fade-in">
                    <h1>ERR: {err.status}</h1>
                    <p className="App-error">{err.message}</p>
                </div>
            )
        }

        var term = this.state.term;
        if (!term) return null;
        var source = term.source.replace(url_regex, (match, ...args) => {
            if (match.endsWith(`)`)) {
                match = match.slice(0, -1);
                return `<a href=${match}>${match}</a>)`;
            }

            return `<a href=${match}>${match}</a>`
        });
        source = '<strong>Source: </strong> ' + source;

        return (
            <div className="App-contentContainer App-animate-fade-in">
                <h1>{term.names[0]}</h1>
                {term.names.length > 1 &&
                    <h3>AKA: {term.names.slice(1).join(', ')}</h3>
                }
                <p>{term.definition}</p>
                <p className="source" dangerouslySetInnerHTML={{ __html: source }} />
                {term.related[0] &&
                    <p><strong>Related:</strong> {term.related.map(r => r.name).join(", ")}</p>
                }
            </div>
        );
    }
}

export default TermPage;
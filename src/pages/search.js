import React, { Component, Fragment as Frag } from 'react';
import {
	BrowserRouter as Router,
	Link,
	Switch
} from 'react-router-dom';
import axios from 'axios';

import SearchResult from '../components/result';
import PageNav from '../components/pagenav';

axios.defaults.baseURL = 'https://api.blossombot.pink';

const PER_PAGE = 10;

class SearchPage extends Component {
	constructor(props) {
		super(props);
		if (this.props.location.search) var { query, page = 1 } = this.decodeSearch();
		else var [query, page] = ['', 1];
		this.state = {
			query,
			page,
			tmpquery: query,
			data: {}
		}

		this.search = this.search.bind(this);
		this.scrollRef = React.createRef();
	}

	async componentDidMount() {
		if (this.state.query) {
			this.search();
		}
	}

	decodeSearch() {
		var [_, query, page] = this.props.location.search.replace(/^\?/, '') //get rid of starting ?
			.match(/query=([^&]+)(?:&page=([0-9]+))?/i)
		query = decodeURIComponent(query);

		return { query, page };
	}

	updateQuery(e) {
		var target = e.target;
		this.setState({ tmpquery: target.value });
	}

	search = async (e, query, page) => {
		if (e) e.preventDefault();
		query = query || this.state.tmpquery;
		page = page || this.state.page;
		if (page < 1) page = 1;

		//if the data's just going to be the same,
		//don't bother searching again
		//prevents errors when holding down the enter key
		if ((query == this.state.query && this.state.data.results)
			&& page == this.state.data.currentPage) return;

		//reset page after new query
		if (query != this.state.query) page = 1;
		var uri = encodeURIComponent(query);
		try {
			var req = await axios(
				`/api/v1/search?query=${uri}` +
				`&pageLength=${PER_PAGE}` +
				`&page=${page}`
			);
		} catch (e) {
			console.log(e.message);
			return this.setState({ err: true });
		}

		this.props.history.push(`?query=${uri}${page > 1 ? `&page=${page}` : ''}`);
		this.setState({ query, data: req.data, err: false });
		this.scrollRef.current.scrollIntoView({
			behavior: 'smooth'
		})
	}

	render() {
		var data = Object.assign(this.state.data, {});
		return (
			<Frag>
				<form className="App-searchForm" ref={this.scrollRef} onSubmit={(e) => this.search(e)}>
					<input
						className="App-searchBar"
						type='text'
						onChange={(e) => this.updateQuery(e)}
						value={this.state.tmpquery}
						placeholder='Type a word and press enter to search!'
						ref={this.scrollRef}
					/>
					<button className="App-searchButton">Search</button>
				</form>
				{this.state.err && <p className="App-error">Woah there! You're making too many requests. Try again in a second, okay?</p>}
				{data.suggestion && <p>Did you mean: <a href={`?query=${encodeURIComponent(data.suggestion)}`}>{data.suggestion}</a></p>}

				<PageNav pages={data.pages} currentPage={data.currentPage} query={this.state.query} selectPage={this.search} neighbors={2} />
				{data.results && (
					<div className="App-searchResults">
						{data.results.map(r => {
							return (<SearchResult key={r.id} term={r} />);
						})}
					</div>
				)}
				{data.resultCount == 0 && this.state.query && <p>No results found</p>}
				<PageNav pages={data.pages} currentPage={data.currentPage} query={this.state.query} selectPage={this.search} neighbors={2} />
			</Frag>
		);
	}
}

export default SearchPage;
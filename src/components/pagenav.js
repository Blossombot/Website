import React, { Component, Fragment as Frag } from 'react';
import { Link } from 'react-router-dom';

const clamp = (val, min, max) => Math.min(Math.max(min, val), max);

const range = (start, end, step = 1) => {
	var nums = [];

	for(var i = start; i <= end; i += step) nums.push(i);
	return nums;
}

const left = 'LEFT';
const right = 'RIGHT';

// solution inspiration/credit:
// https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react
class PageNav extends Component {
	constructor(props) {
		super(props);
	}

	getBlocks() {
		var rangeLength = this.props.neighbors * 2 + 3;
		var pages = [];
		if(this.props.pages <= rangeLength) {
			for(var i = 0; i < this.props.pages; i ++) pages.push(i + 1);
			return pages;
		}

		var start = Math.max(2, this.props.currentPage - this.props.neighbors);
		var end = Math.min(this.props.pages - 1, this.props.currentPage + this.props.neighbors);
		var pages = range(start, end);

		var extras = [
			start > 2,
			(this.props.pages - end) > 1,
			rangeLength - (pages.length + 1)
		];

		if(extras[0] && !extras[1]) {
			pages = [left, ...range(start - extras[2], start - 1), ...pages];
		} else if(!extras[0] && extras[1]) {
			pages = [...pages, ...range(end + 1, end + extras[2]), right];
		} else {
			pages = [left, ...pages, right];
		}

		return [1, ...pages, this.props.pages];
    }

	render() {
		var props = this.props;
		if(!props.pages || props.pages == 1) return null;
		var pages = this.getBlocks();
		return (
			<ul className="App-pageNav" ref={this.props.setRef}>
				{pages.map((p, i) => {
					switch(p) {
						case left:
							return (
								<li
									key={`${props.query}-${i}`}
									onClick={(e) => props.selectPage(e, props.query, this.props.currentPage - (this.props.neighbors * 2) - 1)}
									role="button"
									aria-label="previous"
								>
								&laquo;
				                </li>
							);
							break;
						case right:
							return (
								<li
									key={`${props.query}-${i}`}
									onClick={(e) => props.selectPage(e, props.query, this.props.currentPage + (this.props.neighbors * 2) + 1)}
									role="button"
									aria-label="next"
								>
								&raquo;
				                </li>
							);
							break;
						default:
							return (
								<li
									key={`${props.query}-${i}`}
									className={this.props.currentPage == p ? 'current' : ''}
									onClick={(e) => props.selectPage(e, props.query, p)}
									role="button"
									aria-label={`page ${p}`}>
								{p}
								</li>
							);
							break;
					}
				})}
			</ul>
		);
	}
}

export default PageNav;
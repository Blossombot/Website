import React, { Component, Fragment as Frag } from 'react';
import axios from 'axios';

import TermCard from '../components/termcard';
import PageNav from '../components/pagenav';

const PER_PAGE = 10;

class TermsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages: 1,
            currentPage: 1
        }
        this.getTerms = this.getTerms.bind(this);
        this.scrollRef = React.createRef();
    }

    getTerms = async (e) => {
        if (e) e.preventDefault();
        try {
            var req = await axios(`/api/v1/terms`);
        } catch (e) {
            console.log(e.message);
            return this.setState({ err: true });
        }
        this.setState({ data: req.data, err: false, pages: Math.ceil(req.data.length / PER_PAGE), currentPage: 1 });
    }

    selectPage = (e, query, page) => {
        if (e) e.preventDefault();
        console.log(page);
        console.log(this.pages)
        this.setState({ currentPage: page < 1 ? 1 : (page > this.state.pages ? this.state.pages : page) });
        this.scrollRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    componentDidMount() {
        this.getTerms();
    }

    render() {
        //data should always exist & not be undefined because
        //we're combining it with an empty array
        var data = Object.assign(this.state.data, []);

        //get what we're supposed to be displaying
        var visible = data.slice((this.state.currentPage - 1) * PER_PAGE, (this.state.currentPage - 1) * PER_PAGE + PER_PAGE);

        //cleaned this up a bit
        //since we know that data will always exist, we don't need to
        //factor it into displaying the page's header (aka the h1 and p there)
        //also this makes it so that those will always display, and
        //users won't just get a blank page if something goes wrong
        return (
            <div className="App-contentContainer App-animate-fade-in">
                <h1>Terms</h1>
                <p ref={this.scrollRef}>This is the complete list of terms and definitions within Blossom. This page is always kept up to date with Blossom's database.</p>
                <PageNav selectPage={this.selectPage} query='term' pages={this.state.pages} currentPage={this.state.currentPage} neighbors={2} />
                {
                    visible[0] && visible.map(r => {
                        return (<TermCard key={r.id} term={r} />);
                    })}
                <PageNav selectPage={this.selectPage} query='term' pages={this.state.pages} currentPage={this.state.currentPage} neighbors={2} />
            </div>
        );
    }
}

export default TermsPage;
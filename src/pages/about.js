import React, { Component, Fragment as Frag } from 'react';

class AboutPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="App-contentContainer App-animate-fade-in">
			<h1>About the Bot</h1>
				<p>
					Blossom is a Discord bot that functions{" "}
					as a glossary of plural/system terminology,{" "}
					and as of June 29th 2020, so has this website as well!{" "}
					Officially launched on March 27th, 2020, she is serving{" "}
					over 10,000 users in an ever-growing number of servers.
				</p>
				<p>
					Blossom uses she/her pronouns, her gender is juxera,{" "}
					and her favourite colour is light pink! (#FFCADE, to be exact.){" "}
					Use the <code>b!avatar</code> command for her official artwork,{" "}
					and check out the bot support server for fanart of her.
				</p>
				<p>
					Blossom has a public API! It's available at <a href="https://app.swaggerhub.com/apis-docs/ParanormalVibe/blossom-api/1">https://app.swaggerhub.com/apis-docs/ParanormalVibe/blossom-api/1</a>
				</p>
			<h1>About the Devs</h1>
				<p>
					Wisteria, a traumagenic OSDD-1A system.{" "}
					Has been in the plural community about a year, and can{" "}
					normally be found out and about in plural Discord servers.
				</p>
				<p>
					Arch, by day a programmer, by night...{" "}
					also a programmer. Check out Arch's github here:{" "}
					<a href="https://github.com/ParanormalVibe">https://github.com/ParanormalVibe</a>
				</p>
				<p>
					The Grey Skies, a traumagenic and polyfragmented system with DID.{" "}
					Has been part of the plural community for over 4 years,{" "}
					and has been a Director in Plural Hub for about a year{" "}
					and a half. Check out GS's site for other stuff they do:{" "}
					<a href="https://greysdawn.com">https://greysdawn.com</a>
				</p>
			</div>
		);
    }
}

export default AboutPage;
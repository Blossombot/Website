import React, { Component, Fragment as Frag } from 'react';

class HelpPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		//added some breaks below
		//to help with readability
		return (
			<div className="App-contentContainer App-animate-fade-in">
				<h1>Help</h1>
				<p>Have a question, or interested in the Discord bot? <a href="https://discord.gg/XewsgAF">Join our Discord server!</a></p>
				<p>
					When searching with Blossom,{" "}
					there are certain characters that can be used,{" "}
					to make search results more accurate to what you're{" "}
					trying to find.
				</p>
				<p>
					<strong>AND operator:</strong> +
					<br/>
					<code className="App-example">Examples: poly +plural / headspace +dreams</code>
					<br/>
					The AND operator allows you to always include specific terms{" "}
					in your search. In the examples above, the first will return{" "}
					any results that contain the terms "poly" AND "plural," and{" "}
					the second will return any that contain both "headspace" AND{" "}
					"dreams." Results that are missing one of the specified words{" "}
					won't be returned.
				</p>
				<p>
					<strong>OR operator:</strong> |
					<br/>
					<code className="App-example">Examples: multiple | plural / headspace | mindscape</code>
					<br/>
					The OR operator will search for anything that contains{" "}
					at least one of the terms provided. In the examples above,{" "}
					the first will return anything containing "multiple" OR "plural,"{" "}
					and the second will look for anything with the terms "headspace"{" "}
					OR "mindscape." This is the default operator for searches- using{" "}
					a space between words instead of the | (pipe indicator) will{" "}
					have the same behavior.
				</p>
				<p>
					<strong>NOT operator:</strong> -
					<br/>
					<code className="App-example">Examples: poly -fragment / *mate -headmate</code>
					<br/>
					The NOT operator will search for results that do <em>not</em>{" "}
					contain the given term. In the first example, results that contain{" "}
					the term "poly" but don't contain the term "fragment" will be returned.{" "}
					In the second example, it searches for anything with -mate as a{" "}
					suffix, but only returns those that don't contain the term "headmate."
				</p>
				<p>
					<strong>Phrase operators:</strong> "[term]"
					<br/>
					<code className="App-example">Examples: "fictional introject" / "endogenic system"</code>
					<br/>
					Phrase operators, or quotation marks, will search for a phrase{" "}
					rather than doing the default behavior of searching for each{" "}
					term individually (as mentioned above, in the OR operator section).{" "}
					In the examples above, the first will return anything containing the{" "}
					phrase "fictional introject," while the second will return anything{" "}
					containing the phrase "endogenic system."
				</p>
				<p>
					<strong>Fuzzy operators:</strong> [term]~[number]
					<br/>
					<code className="App-example">Examples: headmate~1 / "endogenic system"~3</code>
					<br/>
					Fuzzy operators are for more advanced searches.{" "}
					These operators can be used to find results with terms or phrases{" "}
					that are similar to the given search input. In the examples above,{" "}
					the first will return anything that has any words that are similar{" "}
					to "headmate," while the second will return anything with phrases{" "}
					similar to "endogenic system" (with looser restrictions).
				</p>
				<p>
					<strong>Precedence operators:</strong> ([term])
					<br/>
					<code className="App-example">Examples: *mate (fictive | factive) /{" "}
							      system (endogenic | traumagenic)</code>
					<br/>
					Precendence operators are also for more advanced searches.{" "}
					The terms used in parentheses take <em>precendence</em>, or{" "}
					have more importance than, other search terms given. In the{" "}
					examples given, the first will search for anything with "fictive"{" "}
					or "factive" before also checking to see if the result contains{" "}
					any phrase ending with -mate. The second will do the same, but{" "}
					with "endogenic" or "traumagenic" taking precendence before{" "}
					the term "system." Similar to a calculator handling numbers{" "}
					inside parentheses (following the order of operations).
				</p>
				<p>
					<strong>Escape character:</strong> \
					<br/>
					<code className="App-example">Examples: \*mate / \-fragment</code>
					<br/>
					The escape character can be used to escape certain{" "}
					operators, in the event that you want to include{" "}
					the operators in the search. In the above examples,{" "}
					the first will include the * (prefix/suffix wildcard){" "}
					when searching for *mate, and return results accordingly.{" "}
					The second will include the - (NOT operator) and return{" "}
					results that contain the term "-fragment."
				</p>
			</div>
		);
    }
}

export default HelpPage;
import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Game from '../routes/game';

const App = () => (
	<div id="app">
		<Header />
		<div id="main-content">
			<Router>
				<Home path="/" />
				<Game path="/game/" />
			</Router>
		</div>
	</div>
)

export default App;

import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1>CHSS 0.0.1</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/game">Game</Link>
			{/* <Link activeClassName={style.active} href="/profile/john">John</Link> */}
		</nav>
	</header>
);

export default Header;

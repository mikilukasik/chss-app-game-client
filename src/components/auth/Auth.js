import { h } from 'preact';
import { Link } from 'preact-router/match';

import style from './style.css';

export const Auth = () => {
  return (<header class={style.authHeader}>
		<nav>
			<Link activeClassName={style.active} href="/auth/login">Login</Link>
			<Link activeClassName={style.active} href="/auth/register">Register</Link>
			<Link activeClassName={style.active} href="/auth/guest">Use a Guest Account</Link>
		</nav>
	</header>);
};

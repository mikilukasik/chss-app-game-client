import { h } from 'preact';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';
import { Login } from '../../components/login';
import { Register } from '../../components/register';
import { Guest } from '../../components/guest';

import style from './style.css';

export const Auth = () => (
	<div class={style.authContainer}>
		
		<header class={style.authHeader}>
			<nav>
				<Link activeClassName={style.active} href="/auth/login">Login</Link>
				<Link activeClassName={style.active} href="/auth/register">Register</Link>
				<Link activeClassName={style.active} href="/auth/guest">Use a Guest Account</Link>
			</nav>
		</header>

		<div>
			<Router>
				<Login path="/auth/login" />
				<Register path="/auth/register" />
				<Guest path="auth/guest" />
			</Router>
		</div>

	</div>
);

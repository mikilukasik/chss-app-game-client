import { h } from 'preact';
import { Router } from 'preact-router';
import { Login } from '../../components/login';
import { Register } from '../../components/register';
import { Guest } from '../../components/guest';

import style from './style.css';
import { Auth } from '../../components/auth';

export const AuthRoute = () => {
	return (<div class={style.authContainer}>
		<Auth />
		<Router>
			<Login path="/auth/login" />
			<Register path="/auth/register" />
			<Guest path="/auth/guest" />
		</Router>
	</div>);
};

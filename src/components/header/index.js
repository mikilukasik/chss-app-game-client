import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { showLoginModal } from '../loginModal';
import { Link } from 'preact-router/match';
import UserContext from '../../context/UserContext';
import style from './style.css';

const Header = () => {
	const { user } = useContext(UserContext);

	return (<header class={style.header}>
		<h1>CHSS</h1>
		<nav>
			{user && user.isAdmin && <Link activeClassName={style.active} href="/admin">Admin</Link>}
			{
				user
					? <Link activeClassName={style.active} href={`/profiles/${user.username}`}>{user.username}</Link>
					: <Link activeClassName={style.active} href="#" onClick={showLoginModal}>Login</Link>
			}
			<Link activeClassName={style.active} href="/game">Game</Link>
			<Link activeClassName={style.active} href="/">Home</Link>
		</nav>
	</header>);
};

export default Header;

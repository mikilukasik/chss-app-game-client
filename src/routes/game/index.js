import { h } from 'preact';
// import style from './style.css';
import Game from '../../components/game';

// Note: `user` comes from the URL, courtesy of our router
const GameRoute = () => {
	return (<Game />);
};

export default GameRoute;

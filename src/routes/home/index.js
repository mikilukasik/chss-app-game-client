import { h } from 'preact';
import { ScoreBoard } from '../../components/scoreBoard';
import style from './style.css';

const Home = () => (
	<div class={style.home}>
		<ScoreBoard />
	</div>
);

export default Home;

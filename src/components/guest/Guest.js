import { h } from 'preact';
import style from './style.css';

export const Guest = () => (<div className={style.guestContainer}>
	<div className={style.header}>Return to your guest acocunt or create a new one</div>
	<div className={style.disclaimer}>
		Guest accounts have no passwords and rely on the use of cookies.
		They can only be used from the computer they were created on.
		Deleting the browser's cookies will permanently lock you out of any guest accounts you have.
	</div>
	<div className={style.guestForm}>
		<label>
			Username:
			<input></input>
			<br />
			<button>Login</button>
		</label>
	</div>
</div>);


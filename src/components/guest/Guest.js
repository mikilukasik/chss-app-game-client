import { h } from 'preact';
import { useState } from 'preact/hooks';
import { authSocket } from '../..';
import style from './style.css';

export const Guest = () => {
  const [guestName, setGuestName] = useState();
  const [error, setError] = useState();

	const onGuestNameChange = ({ target: { value } }) => setGuestName(value);

	const onLoginClick = () => {
		setError(null);
		authSocket.do('guestLogin', { username: guestName }).catch(setError)
	};

	return (<div className={style.guestContainer}>
		<div className={style.header}>Return to your guest acocunt or create a new one</div>
		<div className={style.disclaimer}>
			Guest accounts have no passwords and rely on the use of cookies.
			They can only be used from the computer they were created on.
			Deleting the browser's cookies will permanently lock you out of any guest accounts you have.
		</div>
		<div className={style.guestForm}>
			<form action="javascript:">
				<label>
					Username:
					<input onInput={onGuestNameChange}></input>
					<br />
					<button onClick={onLoginClick} disabled={!guestName}>Login</button>
				</label>
				{error && <div className={style.errorMessage}>{error}</div>}
			</form>
		</div>
	</div>);
};

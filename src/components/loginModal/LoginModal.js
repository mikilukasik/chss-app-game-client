import { h } from 'preact';
import { useState } from 'preact/hooks';
import { getAuthSocket } from '../..';

import Dialog from 'preact-material-components/Dialog';
import TextField from 'preact-material-components/TextField';

import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Button/style.css';

import style from './style.css';

let dialog;
const showLoginModalAwaiters = [];

export const showLoginModal = (val) => new Promise((resolve) => {
	if (dialog) {
		if (val === false) {
			dialog.MDComponent.close();
			return resolve();
		}

		dialog.MDComponent.show();
		return resolve();
	};

	showLoginModalAwaiters.push({ val, resolve })
});

export const LoginModal = () => {
	const [guestName, setGuestName] = useState();
  const [error, setError] = useState();

	const onGuestNameChange = ({ target: { value } }) => setGuestName(value);

	const onLoginClick = async() => {
		setError(null);
		const authSocket = await getAuthSocket();
		authSocket.do('guestLogin', { username: guestName })
			.then(() => showLoginModal(false))
			.catch(setError)
	};

	const useRef = (_dialog) => {
		if (!_dialog) return;
		dialog = _dialog;

		if (showLoginModalAwaiters.length) {
			const val = showLoginModalAwaiters[showLoginModalAwaiters.length].val;
			dialog.MDComponent[val === false ? 'close' : 'show']();

			while (showLoginModalAwaiters.length) {
				showLoginModalAwaiters.pop().resolve();
			}
		}
	};

	return (<div>
		<Dialog ref={useRef} >
			<Dialog.Header>Return to your guest acocunt or create a new one</Dialog.Header>
			<Dialog.Body>
				Guest accounts have no passwords and rely on the use of cookies.
				They can only be used from the computer they were created on.
				Deleting the browser's cookies will permanently lock you out of any guest accounts you have.
			</Dialog.Body>
				<TextField label="Enter username" onKeyUp={onGuestNameChange}/>
				<Dialog.FooterButton onClick={onLoginClick} >Login</Dialog.FooterButton>
				{error && <div className={style.errorMessage}>{error}</div>}
		</Dialog>
	</div>);
};

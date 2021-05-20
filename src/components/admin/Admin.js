import { h } from 'preact';
import { useContext } from 'preact/hooks';
import style from './style.css';
import UserContext from '../../context/UserContext';
import { persistUserSettings } from '../../services/userService';

export const Admin = () => {
  const { user, userSettings, setUserSettings } = useContext(UserContext);
	if (!user || !user.isAdmin) return;

	const onLocalSingleThreadAiChange = ({ target: { checked }}) => {
		setUserSettings({ ...userSettings, useLocalSingleThreadAi: checked });
		persistUserSettings({ useLocalSingleThreadAi: checked });
	};

	return (<div>
		<label>
			<input type="checkbox" checked={userSettings.useLocalSingleThreadAi} onChange={onLocalSingleThreadAiChange} />
			Local single thread move calculation
		</label>
	</div>);
};

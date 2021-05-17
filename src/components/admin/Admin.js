import { h } from 'preact';
import { useContext } from 'preact/hooks';
import style from './style.css';
import UserContext from '../../context/UserContext';
import AdminContext from '../../context/AdminContext';

export const Admin = () => {
  const { user } = useContext(UserContext);
	if (!user || !user.isAdmin) return;

  const { localSingleThreadAi, setLocalSingleThreadAi } = useContext(AdminContext);

	const onLocalSingleThreadAiChange = ({ target: { checked }}) => setLocalSingleThreadAi(checked);

	return (<div>
		<label>
			<input type="checkbox" checked={localSingleThreadAi} onChange={onLocalSingleThreadAiChange} />
			Local single thread move calculation
		</label>
	</div>);
};

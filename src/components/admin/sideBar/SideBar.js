import { h } from 'preact';
import style from './sideBar.scss';
import { Link } from 'preact-router/match';

export const SideBar = () => {
  return (
    <div className={style.sideBarContainer}>
      <Link activeClassName={style.active} href="/admin/old-admin">
        Old Admin
      </Link>
      <Link activeClassName={style.active} href="/admin/engine-tournament">
        Engine Tournament
      </Link>
      {/* <div className={style.sideBarItem}>a</div> */}
    </div>
  );
};

import { h } from 'preact';
import style from './style.scss';
import Button from 'preact-material-components/Button';

export const BreadCrumb = ({ taskPath, setTaskPath }) => {
  const rootClickHandler = () => setTaskPath([]);

  return (
    <div className={style.breadCrumbContainer}>
      <Button className={style.breadCrumbButton} onClick={rootClickHandler}>
        tasks &gt;
      </Button>
      {taskPath.map((name) => (
        <Button className={style.breadCrumbButton} onClick={console.log}>
          {name} &gt;
        </Button>
      ))}
    </div>
  );
};

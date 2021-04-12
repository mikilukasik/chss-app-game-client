import { h } from 'preact';
import style from './style.scss';

const emptyCellClass = style.progressCell;
const filledCellClass = `${style.progressCell} ${style.progressCellFilled}`;

export const ProgressBar = ({ progress = {} }) => {
  const progressArray = []
  for (let i = 0; i < progress.total; i += 1) {
    progressArray.push({ filled: i < progress.completed });
  }

  

  return (<div className={style.progressBar}>
    {/* 
      Empty divs render wrong on iphone 12 chrome 87.0.4280.77
      A dot is placed in ech div for this reason
    */}
    {progressArray.map(({ filled }, i) => <div key={i} class={filled ? filledCellClass : emptyCellClass} >.</div>)}
  </div>);
};

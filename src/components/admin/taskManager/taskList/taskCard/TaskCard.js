import { h } from 'preact';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/LinearProgress/style.css';

import style from './style.scss';

export const TaskCard = ({ command, status, ...params }) => {
  const { totalChildren = 0, unsolvedChildren = 0 } = params;

  return (
    <div className={style.taskCardContainer}>
      <Card className={style.taskCard}>
        <div class="card-header">
          <h2 class=" mdc-typography--title ">
            <div className={style.taskCardHeaderContainer}>
              <div className={style.command}>{command}</div>
              <div className={style.status}>
                <div>{status}</div>
                <div>
                  {status === 'in progress' && (
                    <LinearProgress
                      indeterminate={totalChildren === 0 || totalChildren === unsolvedChildren}
                      progress={totalChildren ? 1 - unsolvedChildren / totalChildren : null}
                    />
                  )}
                </div>
              </div>
            </div>
          </h2>
          <div class=" mdc-typography--caption">
            <table>
              <tbody>
                {Object.keys(params).map((key) => (
                  <tr className={key === 'result' ? style.resultRow : ''}>
                    <td className={style.paramTableKey}>{key}</td>
                    <td className={style.paramTableValue}>
                      {typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <Card.Media className="card-media" />
        <Card.Actions>
          <Card.ActionButtons>
            <Card.ActionButton>OK</Card.ActionButton>
            <Card.ActionButton>cancel</Card.ActionButton>
          </Card.ActionButtons>
          <Card.ActionIcons>
            <Card.ActionIcon>share</Card.ActionIcon>
            <Card.ActionIcon>abort</Card.ActionIcon>
          </Card.ActionIcons>
        </Card.Actions> */}
      </Card>
    </div>
  );
};

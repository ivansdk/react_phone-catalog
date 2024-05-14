import cn from 'classnames';

import './Table.scss';
import React from 'react';

type Props = {
  tableItems: string[][];
  big?: boolean;
};

export const Table: React.FC<Props> = ({ tableItems, big = false }) => {
  return (
    <table
      className={cn('table', {
        table_fz14: big,
      })}
    >
      <tbody>
        {tableItems.map(item => (
          <tr key={item[0]}>
            <th>{item[0]}</th>
            <td>{item[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

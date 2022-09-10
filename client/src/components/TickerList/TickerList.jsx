import React from 'react';
import { useSelector } from 'react-redux';
import { getHighlitedNamesSelector } from '../../store/selectors';
import './TickerList.css';

export const TickerList = React.memo(({ data }) => {

  console.log('render');

  const highlitedNames = useSelector(getHighlitedNamesSelector);

  const showTickerData = (ticker) => {

    const tickerValues = [];

    for (const key in ticker) {
      tickerValues.push(`${key}: ${ticker[key]}`);
    }

    const isHigher = highlitedNames.includes(ticker.ticker);
  
    const classnamePrepare = isHigher ? 'tag is-success' : 'tag is-danger';

    return tickerValues.map(tickerValue => (
      <span className={'span ' + classnamePrepare}>
        {`${tickerValue} ${isHigher ? '↑' : '↓'}`}
      </span>
    ));
  }

  if (!data) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <ul className="tickerlist">
      {data.map(ticker => (
        <li>
          <div className="tickerlist__item">
            {showTickerData(ticker)}
          </div>
        </li>
      ))}
    </ul>
  );
});
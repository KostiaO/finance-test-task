import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { setTickers } from '../../store';
import { getTickersSelector } from '../../store/selectors';

import { TickerList } from '../TickerList/TickerList';

import './SocketLoader.css';

export const SocketLoader = () => {

  const [delay, setDelay] = useState(0);

  const [socketClient, setSocketClient] = useState(null);

  const dispatch = useDispatch();

  useEffect(
    () => {
      const socket = io("ws://localhost:4000");

      socket.emit('start');
    
      socket.on('ticker', (data) => {
        dispatch(setTickers(data));

        socket.on('disconnect', () => {
          socket.disconnect();
        });
      });

      setSocketClient(socket);
    }
  , []);

  const setDataDelayOnServer = () => {
    socketClient.emit('delay', delay);
  }

  const tickers = useSelector(getTickersSelector);

  if (!tickers) {
    return (
      <h1>Loading...</h1>
    )
  }

  return(
    <div className='socketbox'>
      <div className="socketbox__inputs">
        <input
          className='input is-primary' 
          type="number" 
          value={delay}
          onChange={({ target }) => setDelay(Number(target.value))}
        />
        <button 
          type='button'
          className='button is-info'
          onClick={setDataDelayOnServer}
        >
          set delay
        </button>
      </div>
      <div className="socketbox__list">
        <TickerList 
          data={tickers}
        />
      </div>
    </div>
  )
}
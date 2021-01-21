import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const TIME: number = 120;

function App() {
  const [active, setActive] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<number>(TIME);

  useEffect(() => {
    let interval: any = null;
    if (active) {
      interval = setInterval(() => {
        setRemaining(remaining - 1);
      }, 1000);
    } else if (!active && remaining > 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active, remaining]);

  const reset = () => {
    setActive(false);
    setRemaining(TIME);
  }

  const start = () => {
    setActive(true);
  }

  const pause = () => {
    setActive(false);
  }

  return (
    <div className="App">
      {
        remaining > 0?
          <div className='timer'>
            <h1 className='title'>
              {remaining <= 0? '面糊了！' : `${remaining}秒`}
            </h1>
            <div>
              <button className='start-button' onClick={active? pause : start}>
                {active? 'Pause' : 'Start'}
              </button>
              <button className='start-button' onClick={reset}>
                Reset
              </button>
            </div>
          </div>
        :
          <div className='flash'>
            <h1 className='title'>
              面糊了！
            </h1>
            <button className='start-button' onClick={reset}>
              Reset
            </button>
          </div>
      }
      
    </div>
  );
}

export default App;

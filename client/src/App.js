import { useEffect } from 'react';
import './App.css';

import { SocketLoader } from './components/SocketLoader/SocketLoader';

function App() {
  useEffect(() => {
  }, []);


  return (
    <div className="App">
      <SocketLoader />
    </div>
  );
}

export default App;

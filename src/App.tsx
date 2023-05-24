import React, { useState } from 'react';
import { Menu, Calculator, Graph2D, Graph3D } from './components';

import './App.css';

export enum EPAGES {
  CALCULATOR,
  GRAPH2D,
  GRAPH3D
}

const App: React.FC = () => {
  const [showMenuItem, setShowMenuItem] = useState<EPAGES>(EPAGES.GRAPH3D);
    
  return (
    <div className="App">
      <Menu showMenuItem={setShowMenuItem} />
      {showMenuItem === EPAGES.CALCULATOR?
        <Calculator /> :
        showMenuItem === EPAGES.GRAPH2D ?
          <Graph2D /> :
          showMenuItem === EPAGES.GRAPH3D ?
            <Graph3D /> : <></>
      }
    </div>
  );
};

export default App;

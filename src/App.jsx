import React, { useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <GlobalStyles />
      <span>Hola Mundo</span>
    </div>
  );
}

export default App;

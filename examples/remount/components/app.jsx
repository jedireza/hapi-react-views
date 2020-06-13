'use strict';

import React from 'react'

const handleClick = (foo) => {
  alert('Hi ' + foo);
}

const App = ({foo}) =>{ 
  return
  (
    <div>
        <h1>Foo: ({foo})</h1>
        <button onClick={()=>{handleClick(foo)}}>Event test</button>
    </div>
  );
}

export default App;

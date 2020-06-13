'use strict';

import React from 'react'


class App extends React.Component {
    handleClick () {
      alert('Hi ' + this.props.foo);
    }

    render () {

        return (
          <div>
              <h1>Foo: ({this.props.foo})</h1>
              <button onClick={this.handleClick.bind(this)}>Event test</button>
          </div>
        );
    }
}


module.exports = App;

const React = require('react');


const Component = React.createClass({
    handleClick: function () {
      alert('Hi ' + this.props.foo);
    },
    render: function () {

        return (
          <div>
              <h1>Foo: ({this.props.foo})</h1>
              <button onClick={this.handleClick}>Event test</button>
          </div>
        );
    }
});


module.exports = Component;

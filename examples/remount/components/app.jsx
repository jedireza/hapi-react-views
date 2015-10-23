var React = require('react');


var Component = React.createClass({
    render: function () {

        return (
            <div>Foo: ({this.props.foo})</div>
        );
    }
});


module.exports = Component;

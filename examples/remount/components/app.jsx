const React = require('react');


const Component = React.createClass({
    render () {

        return (
            <div>Foo: ({this.props.foo})</div>
        );
    }
});


module.exports = Component;

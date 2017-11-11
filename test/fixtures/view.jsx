'use strict';
const React = require('react');
const Navbar = require('./navbar.jsx');


class Component extends React.Component {
    render () {

        return (
            <div>
                <Navbar />
                <p>Activate the plot device.</p>
            </div>
        );
    }
}


module.exports = Component;

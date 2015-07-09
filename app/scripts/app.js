var React = require('react');
var Timeline = require('./components/timeline.jsx');

require('datejs');

React.render(
    <Timeline />,
    document.getElementById('timeline')
);
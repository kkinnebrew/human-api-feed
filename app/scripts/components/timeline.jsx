var React = require('react');
var Editor = require('./editor.jsx');
var Feed = require('./feed.jsx');

var Timeline = React.createClass({

    getDefaultProps: function() {
        return {}
    },

    getInitialState: function() {
        return {
            items: []
        }
    },

    handleShare: function(item) {
        this.state.items.push(item);
        this.setState({ 'items': this.state.items });
    },

    render: function() {
        console.log(this.state);
        return (
            <div>
                <Editor onClick={this.handleShare} />
                <Feed items={this.state.items} />
            </div>
        );
    }

});

module.exports = Timeline;
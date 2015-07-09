var React = require('react');

var FeedQuote = React.createClass({

    getDefaultProps: function() {
        return {
            item: {}
        }
    },

    render: function() {

        var item = this.props.item;

        if (item.links) {
            var url = item.links[0];
            return (
                <div className="feed-item quote-item">
                    <a className="quote link" href={url} target="_blank">{item.text}</a>
                    <hr/>
                    <div className="date">Created: {item.created_at}</div>
                </div>
            );
        } else {
            return (
                <div className="feed-item quote-item">
                    <div className="quote">{item.text}</div>
                    <hr/>
                    <div className="date">Created: {item.created_at}</div>
                </div>
            );
        }

    }

});

module.exports = FeedQuote;
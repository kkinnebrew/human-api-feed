var React = require('react');
var FeedQuote = require('./feed-quote.jsx');
var FeedImage = require('./feed-image.jsx');

var Feed = React.createClass({

    getDefaultProps: function() {
        return {
            items: []
        }
    },

    render: function() {

        var items = this.props.items, itemLines;

        if (items && items.length) {

            itemLines = items.map(function (item) {
                switch (item.type) {
                    case 'quote':
                        return <FeedQuote item={item} />;
                        break;
                    case 'image':
                        return <FeedImage item={item} />;
                        break;
                }
            });

        } else {
            itemLines = <div className="empty">No Posts Yet</div>;
        }

        return (
            <div id="feed">
                {itemLines}
            </div>
        );
    }

});

module.exports = Feed;
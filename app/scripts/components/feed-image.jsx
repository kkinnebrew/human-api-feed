var React = require('react');

var FeedImage = React.createClass({

    getDefaultProps: function() {
        return {
            item: {}
        };
    },

    render: function() {

        var item = this.props.item;

        var url = item.links[0];

        return (
            <div className="feed-item image-image">
                <div className="image">
                    <img src={url} alt="Image" />
                </div>
                <div className="image-caption">{item.text} - <a href={url} alt="" target="_blank">Link</a></div>
                <hr/>
                <div className="date">Created: {item.created_at}</div>
            </div>
        );
    }

});

module.exports = FeedImage;
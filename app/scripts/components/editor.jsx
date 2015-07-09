var React = require('react');
var imgurParser = require('../parsers/imgur_parser');
var linkParser = require('../parsers/link_parser');
var textParser = require('../parsers/text_parser');

var Editor = React.createClass({

    getDefaultProps: function() {
        return {}
    },

    handleClick: function() {

        var content = React.findDOMNode(this.refs.field).value;

        if (!content) return;

        if (typeof this.props.onClick != 'function') return;

        // parse content

        var item;

        if (item = imgurParser(content)) {
            this.props.onClick.call(this, item);
        } else if (item = linkParser(content)) {
            this.props.onClick.call(this, item);
        } else {
            item = textParser(content);
            this.props.onClick.call(this, item);
        }

        React.findDOMNode(this.refs.field).value = '';

    },

    render: function() {
        return (
            <div id="editor">
                <textarea className="editor-field" ref="field" placeholder="Share something..."></textarea>
                <input className="editor-button" type="button" value="Share" onClick={this.handleClick} />
            </div>
        );
    }

});

module.exports = Editor;
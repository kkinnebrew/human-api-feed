var urlPattern = /https?:\/\/(www\.)?imgur\.com\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

module.exports = function(content) {

    if (content.match(urlPattern)) {

        return {
            type: 'image',
            text: content.replace(urlPattern, '').replace(/ +(?= )/g,''),
            links: content.match(urlPattern),
            created_at: (new Date()).toString('dddd, MMMM d, yyyy')
        };

    } else {

        return false;

    }

};
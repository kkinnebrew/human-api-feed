var urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

module.exports = function(content) {

    if (content.match(urlPattern)) {

        return {
            type: 'quote',
            text: content.replace(urlPattern, '').replace(/ +(?= )/g,''),
            links: content.match(urlPattern),
            created_at: (new Date()).toString('dddd, MMMM d, yyyy')
        };

    } else {

        return false;

    }

};
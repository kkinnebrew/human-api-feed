module.exports = function(content) {

    return {
        type: 'quote',
        text: content,
        links: [],
        created_at: (new Date()).toString('dddd, MMMM d, yyyy')
    };

};
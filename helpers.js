const icons = require('./icons');

const parse = str => (str || '').toLowerCase();

const helpers = {
    icon: params => {

        if(!params || !icons[params]) return '';

        const icon = typeof icons[params] == 'string' ? {
            path: icons[params],
            box: '0 0 24 24'
        } : icons[params];

        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.box}"><path d="${icon.path}"></path></svg>`;
    },
    search: content => {

        let posts = [];
        
        content.data.website.contentStructure.posts.forEach(post => (!post.isHidden && posts.push(content.fn({
            ...post,
            text: '',
            keyword: `${parse(post.title)}${parse(post.excerpt)}${parse(JSON.stringify(post.postViewConfig || {}))}`
        }))));

        return posts.join('');

    },
    debug: content => {

        let res = JSON.stringify(content);

        return `<script>console.log(${res});</script>`;
    }
};

module.exports = helpers;
const icons = require('./icons');

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
        
        content.data.website.contentStructure.posts.forEach(post => (!post.isHidden && posts.push(JSON.stringify({
            ...post,
            text: ''
        }))));

        return `<pre data-search="">${posts.join('')}</pre>`;

    },
    debug: content => {

        let res = JSON.stringify(content);

        return `<script>console.log(${res});</script>`;
    }
};

module.exports = helpers;
const icons = require('./icons');

const config = {
    meals: {
        'pequeno-almoco': 'Pequeno Almoço',
        'almoco': 'Almoço',
        'jantar': 'Jantar'
    }
};

const parse = str => (str || '').toLowerCase();

const isProduct = post => (post && post.template && post.template == 'product');

const isRecepie = post => (post && post.template && post.template == 'recepie');

const isMeal = post => (post && isRecepie(post) && post.postViewConfig && (post.postViewConfig.recepieDay || post.postViewConfig.recepieMeal));

const helpers = {
    calendar: content => {

        let posts = [];
    
        let data = {};
    
        let meals = {};
    
        for(let meal in config.meals) meals[meal] = {
            subtitle: config.meals[meal],
            meal
        };

        const init = (day, meal, post) => {
                    
            if(!data[day]) data[day] = {
                day,
                meals: {
                    ...meals
                }
            };

            if(meal && post) data[day].meals[meal] = post;
        };
    
        content.data.website.contentStructure.posts.forEach(post => {
    
            if(isMeal(post)) {
    
                let day = typeof post.postViewConfig.recepieDay == 'boolean' ? 1 : parseInt(post.postViewConfig.recepieDay);
    
                const meal = post.postViewConfig.recepieMeal;
    
                day && meal && init(day, meal, {
                    ...(post || {}),
                    subtitle: config.meals[meal],
                    day,
                    meal,
                    text: ''
                });
            }
        });
    
        for(let day = 1; day <= 31; day++) init(day);

        for(let day in data) posts.push(content.fn(data[day]));
        
        return posts.join('');
    },
    store: content => {

        let posts = [];

        content.data.website.contentStructure.posts.forEach(post => (isProduct(post) && posts.push(content.fn(post))));

        return posts.join('');
    },
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

        const debug = !content.data.config.custom ? false : content.data.config.custom.debug;

        const prod = !content.data.renderer ? false : !content.data.renderer.previewMode;

        const data = content.data.website.contentStructure;

        return !debug || debug == '0' ? '' : (`<script>
            ${!prod ? '' : 'console.warn(\'Debug is not recommended in production\')'};
            console.log(${JSON.stringify(content.data)});
            console.log('config', ${JSON.stringify(content.data.config)});
            console.log('authors', ${JSON.stringify(data.authors)});
            console.log('posts', ${JSON.stringify(data.posts)});
            console.log('tags', ${JSON.stringify(data.tags)});
        </script>`);
    }
};

module.exports = helpers;
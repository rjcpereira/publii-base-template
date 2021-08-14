# Publii Base template

A small set of helpers, icons with Hot Reload for JS and SCSS.

## Requirements

- [Publii](https://getpublii.com/download/)
- [NodeJS (12+)](https://nodejs.org/en/download/)

## Rename

You can change the theme name, info and config in these files:

- `config.json`
- `README.md`
- `package.json`
- `BASE_TEMPLATE.lang.json`

## Install

- install `BASE_TEMPLATE` theme
- point the site theme to `BASE_TEMPLATE`
- open the folder: `Publii/sites/YOUR_SITE/input/themes/BASE_TEMPLATE`
- run `npm i`

## Build for production

- run `gulp build` or `gulp prod`

## Development (to build and watch JS and SCSS)

- run `gulp` or `gulp dev`

### Helpers

#### Debug (not recommended in production)

Console log with all content data

```handlebars
{{#debug}}{{/debug}}
```

#### Icon

Renders an SVG icon

```handlebars
<p>static icon</p>
{{{ icon 'search' }}}

<a href="{{menuUrl}}">
   {{{ icon cssClass }}}
   <span>dynamic icon (based on menu item class)</span>
</a>
```

#### Search (not working yet)

Listen to search inputs, it the current location is `search` the results will filtered

```handlebars
<header>
    <input data-search="input" placeholder="Search"/>
</header>
<nav id="mobile-menu" area-hidden="true">
    <input data-search="input" placeholder="Search"/>
</nav>
{{#search}}
    <article>
        <a href="{{url}}">
            {{#featuredImage}}
                <img src="{{url}}"/>
            {{/featuredImage}}
            <span>{{title}}</span>
        </a>
    </article>
{{/search}}
```

### Javascript and SCSS development

Every change on `scripts.js` and `styles.scss` will minify and save the content in the current working directory and in the preview assets folder.

#### scripts.js

- `Publii/sites/YOUR_SITE/input/themes/BASE_TEMPLATE/assets/js/scripts.min.js`
- `Publii/sites/YOUR_SITE/preview/themes/BASE_TEMPLATE/assets/js/scripts.min.js`

#### styles.scss (scss/reset.scss & scss/mixins.scss)

- `Publii/sites/YOUR_SITE/input/themes/BASE_TEMPLATE/assets/css/main.scss`
- `Publii/sites/YOUR_SITE/input/themes/BASE_TEMPLATE/assets/css/styles.scss`
- `Publii/sites/YOUR_SITE/preview/themes/BASE_TEMPLATE/assets/css/main.scss`
- `Publii/sites/YOUR_SITE/preview/themes/BASE_TEMPLATE/assets/css/styles.scss`

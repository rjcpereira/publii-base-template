(function () {
	
	var state = {};

	const parse = str => (str || '').toLowerCase();

	function getElement(selector, context) {

        return (context || document).querySelector(selector);
    }

	function getElements(selector, context) {

        return (context || document).querySelectorAll(selector);
    }

	function loop(arr, next) {

        if(arr && next) for(var i = 0; i < arr.length; i++) next(arr[i]);
    }

	function hasClass(element, css) {
        
		if(!element || !css) return;
        
		return !element ? false : (element.classList ? element.classList.contains(css) : (new RegExp('(^|\\s)' + css + '(\\s|$)')).test(element.className));
    }

    function addClass(element, css) {
        
		if(!element || !css) return;
        
		!element.classList ? !hasClass(element, css) && (element.className += (element.className ? ' ' : '') + css) : element.classList.add(css);
    }

    function removeClass(element, css) {
        
		if(!element || !css) return;
        
		!element.classList ? (element.className = trim(element.className.replace(css, '')), !element.className && element.removeAttribute('class')) : element.classList.remove(css);
    }

    function toggleClass(element, css) {
        
		if(!element || !css) return;
        
		!element.classList ? (hasClass(element, css) ? removeClass(element, css) : addClass(element, css)) : element.classList.toggle(css);
    }

    function setClass(element, css, status) {
        
		if(!element || !css) return;
        
        !status ? removeClass(element, css) : addClass(element, css);
    }

	function onChange(element, next) {

		setEvent(element, 'input', next);
	}

	function onClick(element, next) {

		setEvent(element, 'click', next);
	}

	function setEvent(element, event, next, arg) {

		if(!event || !element || !next) return;

		element.addEventListener(event, next, arg);
	}

	function unsetEvent(element, event, next) {

		if(!event || !element || !next) return;

		element.removeEventListener(event, next);
	}

	function getQueryString(key) {

		var search = location.search.substring(1);

		if(!search) return;

		var query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

		if(!query) return;

		return !key ? query : query[key];
	}

	function setQueryString(query) {

		var args = [];

		if(query) for(var key in query) args.push(`${key}=${query[key]}`);

		if (history.pushState) {

			var url = window.location.protocol + "//" + window.location.host + window.location.pathname;
			
			if(args.length) url += `?${args.join('&')}`;
			
			window.history.pushState({
				path: url
			}, '', url);
		}
		else window.location.search = !args.length ? '' : `?${args.join('&')}`;
	}

	function filter(keyword) {

		clearTimeout(state.search);

		state.search = setTimeout(function() {

			loop(state.results, function(result) {

				var hide = !result || !keyword || !result.hasAttribute('data-search');
				
				if(!hide) {

					var value = result.getAttribute('data-search');

					hide = !value.includes(keyword);
				}

				setClass(result, 'active', !hide);
			});
		}, 250);

		setQueryString({
			q: keyword
		});

		loop(state.inputs, function(input) {

			if(input.value != keyword) input.value = keyword || '';
		});
	}

	function search() {

		state.inputs = getElements('input[data-search]');

		var value = getQueryString('q');

		loop(state.inputs, function(input) {

			value && filter(value);

			onChange(input, function(evt) {

				filter(evt.target.value);
			});
		});

		state.results = getElements('article[data-search]');
	}

	function init() {

		search();
	}

	window.addEventListener('load', init);
	
})();   
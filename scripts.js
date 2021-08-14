(function () {

    var config = {};

	var inputs;

	var results = [];

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
    
	function hasClass(element, css) {}
    
	function toggleClass(element, css) {}

	function addClass(element, css) {}

	function removeClass(element, css) {}

	function setClass(element, css, status) {}

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

	function search() {}

	function init() {

		inputs = getElements('input[data-search]');
		console.log(inputs)

		loop(inputs, function(input) {

			onChange(input, function(evt) {

				console.log('change', evt.target.value);
			});
		});

		var submit = getElement('button[data-search]');
		console.log(submit)

		onClick(submit, function() {

			console.log('submit');
		});
	}

	window.addEventListener('load', init);
	
})();
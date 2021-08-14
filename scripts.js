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

	function search() {}

	function init() {
	}

	window.addEventListener('load', init);
	
})();
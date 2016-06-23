define([
	'jquery'

], function ($) {

	return {

		options: {
			embedsSelector: '.instagram',
			$embeds: null
		},

		init: function () {

			this.options.$embeds = document.querySelectorAll(this.options.embedsSelector);

			[].forEach.call(this.options.$embeds, (function(element) {
				this.renderDataFromApi(element);
			}).bind(this));

		},

		renderDataFromApi: function(element) {
			var embedElement = element.getAttribute('data-embed'),
				MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
				observer;

			// params omitscript=true prevent loading Instagram library every time on loading every post
			$.ajax({
				type: 'GET',
				url: 'https://api.instagram.com/oembed?url=http://instagr.am/p/' + embedElement + '/&omitscript=true',
				crossDomain: true,
				headers: { 'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PUT' },
				async: true,
				dataType: 'jsonp',
				success: function (data) {

					// Using Mutation Observer to detect when api loads instagram container
					// so we can call special method instgrm.Embeds.process on existing containers
					observer = new MutationObserver(function () {
						window.instgrm.Embeds.process();
						observer.disconnect();
					});

					observer.observe(element, {
						childList: true
					});

					element.innerHTML = data.html;
				},
				error: function(data) {
					console.log('Instagram failed', data);
				}
			});
		}

	};

});
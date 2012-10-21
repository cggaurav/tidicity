define(['jquery', 
	'underscore', 
	'backbone', 
	'text!templates/navbar.html'], 
	function($, _, Backbone, navbarTemplate) {

	var NavbarView = Backbone.View.extend({

		el: $("#navbar"),

		initialize: function() {
			this.render();
		},

		render: function() {
			var compiledTemplate = _.template($(mainHomeTemplate));
			this.$el.html(compiledTemplate);
		}
	});

	return MenuView;
});
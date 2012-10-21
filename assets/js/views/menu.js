define(['jquery', 'underscore', 'backbone', 'text!templates/menu.html'], function($, _, Backbone, mainHomeTemplate) {

	var MenuView = Backbone.View.extend({

		el: $("#navbarmenu"),

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
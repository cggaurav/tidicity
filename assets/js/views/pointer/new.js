define(['jquery', 
	'underscore', 
	'backbone',
	'jquerym', 
	'text!templates/pointer/new.html',
	'text!templates/pointer/postPointer/step1.html',
	'text!templates/pointer/postPointer/step2.html'],
	function($, _, Backbone, 
		jquerym,
		postMapPointerTemplate,
		step1Template,
		step2Template) {

		var PostPointerView = Backbone.View.extend({

			el: $("#new"),

			// First page has index = 1
			index: 1,
			
			templateStep1: step1Template,
			
			templateStep2: step2Template,

			template: postMapPointerTemplate,

			initialize: function() {
			console.log('[ListView] this view is initialized');
		},

		events: {
			'click .gotoStep1' : 'clickOnGotoStep1',
			'click .gotoStep2' : 'clickOnGotoStep2'
		},

		render: function() {
		 	var self = this;
		 	if (this.index == 1) {
		 		// Render Step 1
		 		this.renderStep1();
		 	} else {
		 		// Render Step 2
		 		this.renderStep2();
		 	}
		 	// Need to recreate the page once the thing is loaded
		 	this.$el.page('destroy').page();
			//this.$el.page.trigger('create');
			// Currently the return does nothing
			console.log('[PostPointerView] Rendering Complete');
			return this;
		},

		renderStep1: function () {
			var self = this;
			var compiledHtml = _.template(self.templateStep1, {});
		 	this.$el.html(compiledHtml);
		},

		renderStep2: function () {
			var self = this;
			var compiledHtml = _.template(self.templateStep2, {});
		 	this.$el.html(compiledHtml);
		},

		clickOnGotoStep1: function() {
			// Do some saving of data
			this.index = 1;
			this.render();
		},

		clickOnGotoStep2: function() {
			// Do some saving
			this.index = 2;
			this.render();
		}
	});

return PostPointerView;
});
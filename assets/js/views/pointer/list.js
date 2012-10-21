define(['jquery', 
	'underscore', 
	'backbone', 
	'text!templates/pointer/list.html', 
	'models/pointer/list', 
	'models/pointer/item',
	'views/pointer/item'],
	function($, _, Backbone, 
		mapPointerListTemplate, 
		MapPointerList, 
		MapPointer, 
		MapPointerView) {

		var MapPointerListView = Backbone.View.extend({

			el: $("#content"),

			template: mapPointerListTemplate,

			model: MapPointerList,

			map: null,

			initialize: function() {
			// HACK: we should allow for 
			// the map to be defined 
			// as a property of collection
			this.map = window.map;

			// Bind the model changes
			this.model.bind("reset", this.render, this);
			this.model.bind("add", this.add);

			this.render();
			console.log('[ListView] this view is initialized');
		},

		/**
		 * Adds an item to the Map Pointer List View
		 * And delegates its rendering to the
		 * Item View for that pointer
		 * @param {[type]} item [description]
		 */
		 add: function(item) {
		 	var self = this;
		 	var newItem = new MapPointerView({
		 		model: item,
		 		map: self.map
		 	});
		 	newItem.render();
		 },

		/**
		 * Clears the pointers from the Map
		 * @return {[type]} [description]
		 */
		 clearPointers: function() {
		 	var self = this;
		 	if (self.Markers) {
		 		for (i in Markers) {
		 			Markers[i].setMap(null);
		 		}
		 		console.log("[MapPointerListView] Cleared all the markers");
		 	}
		 },

		 render: function() {
		 	var self = this;
			// Remove all the pointers from the view
			self.clearPointers();
			_.each(this.model.models, function(item) {
				self.add(item);
			}, this);

			// Currently the return does nothing
			return this;
		}
	});

return MapPointerListView;
});
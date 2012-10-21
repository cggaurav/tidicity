define(['jquery', 'underscore', 'backbone'], 
	function($, _, Backbone) {

		var MapPointerList = Backbone.Collection.extend({
			model: MapPointer,
			initialize: function(){
				console.log('this model has been initialized');	
			}
		});

		return MapPointerList;
	});

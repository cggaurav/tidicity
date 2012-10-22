define(['jquery', 
	'underscore', 
	'backbone',
	'models/pointer/item'], 
	function($, _, Backbone, MapPointer) {

		var MapPointerList = Backbone.Collection.extend({
			model: MapPointer,

			initialize: function(){
				console.log('this model has been initialized');	
			},

			url: function() {
				return "http://tidicity.herokuapp.com/report";
			}

		});

		return MapPointerList;
	});

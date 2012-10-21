define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/pointer/item.html', 
	'models/pointer/item'], 
	function($, _, Backbone, mapPointerTemplate, MapPointer) {

		var MapPointerItemView = Backbone.View.extend({

			el: $("#content"),	  
			model : MapPointer,
			map : null,

			initialize: function(){
				// This is a bit of a hack 
				// Later we will change it 
				// to inherit from the 
				// collection
				this.map = window.map;
				// Call render as soon as possible
				this.render();
				console.log('this view is initialized');
			},

			render: function(){
				var this_ = this;
				var p = new google.maps.LatLng(this_.model.get('latitude'), this_.model.get('longitude'));	
				var marker = new google.maps.Marker({
					position: p,
					map: this_.map,
					title:"Hello World!"
				});
				console.log("marker " + marker);
			}
		});

		return MapPointerItemView;
	});
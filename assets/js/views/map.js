define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/map.html'], function($, _, Backbone,mainHomeTemplate) {

		var MapView = Backbone.View.extend({
			mapOptions: {
				center: new google.maps.LatLng(-34.397, 150.644),
				zoom: 8,
				mapTypeId: google.maps.MapTypeId.ROADMAP	
			},

			el: $("#content"),	  
			map : null,
			initialize: function(){
				this.$el.html(mainHomeTemplate);
				var m = this.$el.find('#map_canvas');
			    this.map = new google.maps.Map(m.get(0), this.mapOptions);
			    this.render();
			},

			render: function(){
			//	$('#content').replaceWith(this.map);
				// var map = new google.maps.Map(this.$el.find("#map_canvas"),this.mapOptions);
			}
		});

		return MapView;
    });
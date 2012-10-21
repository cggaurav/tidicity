define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/map.html', 'models/pointer/item'], function($, _, Backbone,mainHomeTemplate, MapPointer) {

		var MapView = Backbone.View.extend({

			mapOptions: {
				center: new google.maps.LatLng(-34, 151),
			    zoom: 8,
			    mapTypeId: google.maps.MapTypeId.ROADMAP	

			},
			el: $("#content"),	  
			map : null,
			self : this,

			// onError Callback receives a PositionError object
			//
			getLocationOnError: function(error) {
			    alert('code: '    + error.code    + '\n' +
			          'message: ' + error.message + '\n');
			},

			initialize: function(){
				var x = new MapPointer();
				var this_=this;
				var position = null;
				navigator.geolocation.getCurrentPosition(function(position) {
					position = position;
					console.log(position);
					this_.mapOptions = {
						center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
					    zoom: 15,
					    mapTypeId: google.maps.MapTypeId.ROADMAP	
					};
					this_.render();
				}, this_.getLocationOnError);	
				
			},

			render: function(){
				this.$el.html(mainHomeTemplate);
				var m = this.$el.find('#map_canvas');
			    this.map = new google.maps.Map(m.get(0), this.mapOptions);
			    window.map = this.map;
				//	$('#content').replaceWith(this.map);
				// var map = new google.maps.Map(this.$el.find("#map_canvas"),this.mapOptions);
			}
		});

		return MapView;
    });
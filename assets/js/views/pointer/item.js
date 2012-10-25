define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/pointer/item.html', 
	'models/pointer/item'], 
	function($, _, Backbone, mapPointerTemplate, MapPointer) {

		var MapPointerItemView = Backbone.View.extend({

			el: $("#content"),	
			template: mapPointerTemplate, 
			model : MapPointer,
			map : null,

			getIconByCategory: function(category){
				// console.log("Category is " + category);
				if(category == "Uncategorized")
					return "../images/icon/icon.png";
				else if(category == "Garbage")
					return "../images/icon/garbage.png";
				else if(category == "Roadblock")
					return "../images/icon/roadblock.png";
				else if(category == "Graffiti")
					return "../images/icon/graffiti.png";
				else if(category == "Water Logging")
					return "../images/icon/water.png";
				else if(category == "Other")
					return "../images/icon/other.png";
				else 
					return "../images/icon/icon.png";
			},

			getContentOfMarker: function(){
				console.log(this);
				// console.log("Description is " + this.get('desription'));
			},

			// InfoWindow: function(marker, message) {
	  //           var info = message;

	  //           var infoWindow = new google.maps.InfoWindow({
	  //               content: message
	  //           });

	            
			// },

			   

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
				var m = _.template(this_.template, this_.model.toJSON());
				var position = new google.maps.LatLng(this_.model.get('latitude'), this_.model.get('longitude'));	
				var marker = new google.maps.Marker({
					position: position,
					map: this_.map,
					icon: this_.getIconByCategory(this_.model.get("category")),
					content: m,
					visible: true
				});

				google.maps.event.addListener(marker, "click", function() {
					// console.log(marker.getPosition());	
					var infoBox = new InfoBox();
					infoBox.setContent(marker.content);
					infoBox.open(this_.map,marker);
				});
				// google.maps.event.addListener(marker, 'click', function () {
	   //              var infoWindow = new google.maps.InfoWindow();
	   //              infoWindow.setContent(marker.content);
	   //              infoWindow.open(this_.map, marker);
	   //          });
				console.log("marker " + marker);
			}
		});

		return MapPointerItemView;
	});
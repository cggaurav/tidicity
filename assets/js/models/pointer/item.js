define(['jquery', 'underscore', 'backbone'], 
	function($, _, Backbone) {

		var MapPointer = Backbone.Model.extend({
			defaults: {
				category: 'Uncategorized',
				description: 'I love Tidicity!',
				latitude: 1.3,
				longitude: 103.7,
				altitude : null,
				priority: 2, 
				status: 'reported',
				accuracy : 54,
				altitude_accuracy: null,
				timestamp: null,
				img_url: '',
				user_id: '1'
			},
			initialize: function(){
				console.log("MapPointer model has been defined.");
			},
			url: function(){
				return "http://tidicity.herokuapp.com/report";
			}
		});

		return MapPointer;
	});

/* STATUS Params */
// ['reported', 'notified', 'action in progress', 'solved']

/* Priority Limits */
// Number from 1 to 5
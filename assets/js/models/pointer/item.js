define(['jquery', 'underscore', 'backbone'], 
	function($, _, Backbone) {

		var MapPointer = Backbone.Model.extend({
			defaults: {
				category: 'uncategorized',
				description: 'Sample description',
				latitude: -34.397,
				longitude: 150.644,
				user_id: '1'
			},
			initialize: function(){
				console.log('this model has been initialized');	
			}
		});

		return MapPointer;
	});

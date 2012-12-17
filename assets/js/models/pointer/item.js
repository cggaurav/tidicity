define(['jquery', 'underscore', 'backbone'], 
	function($, _, Backbone) {

		var MapPointer = Backbone.Model.extend({
			defaults: {
        upvotes: 1
      },
				category: 'Uncategorized',
				description: 'I love Tidicity!',
        latitude: 1.3,
				longitude: 103.7,
				// altitude : null,
				// priority: 2, 
				// status: 'reported',
				// accuracy : 54,
				// altitude_accuracy: null,
				// timestamp: null,
				// img_url: '',
				// user_id: '1'
			dateDiff: function ( d1, d2 ) {
			    var diff = Math.abs(d1 - d2);
			    if (Math.floor(diff/86400000)) {
			        return Math.floor(diff/86400000) + " days";
			    } else if (Math.floor(diff/3600000)) {
			        return Math.floor(diff/3600000) + " hours";
			    } else if (Math.floor(diff/60000)) {
			        return Math.floor(diff/60000) + " minutes";
			    } else {
			        return "< 1 minute";
			    }
			},
			toJSON: function () {
			    var json = Backbone.Model.prototype.toJSON.call(this);
			    // console.log(json.timestamp);
			    // console.log(new Date());
			    json.timestamp = this.dateDiff(new Date(json.timestamp), new Date());
			    return json;
			},
			initialize: function(){
				console.log("MapPointer model has been defined.");
				console.log(this.upvotes);
        var json = Backbone.Model.prototype.toJSON.call(this);
				json.timestamp = this.dateDiff(new Date(json.timestamp), new Date());
				return json;
			},
			url: function(){
				return "http://tidicity.herokuapp.com/allreports";
			}
		});

		return MapPointer;
	});

/* STATUS Params */
// ['reported', 'notified', 'action in progress', 'solved']

/* Priority Limits */
// Number from 1 to 5

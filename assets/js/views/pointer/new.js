define(['jquery', 'underscore', 'backbone', 'jqueryui', 'models/pointer/item', 'text!templates/pointer/postPointer/step1.html', 'text!templates/pointer/postPointer/step2.html', 'text!templates/pointer/postPointer/step3.html', 'upload', 'simpleDialog'],
// Uploader

function($, _, Backbone, jQueryUI, PointerModel, step1Template, step2Template, step3Template, Uploader, simpledialog2) {

	var PostPointerView = Backbone.View.extend({

		el: $("#content"),

		model: PointerModel,

		// Temporary vars needed to store shit
		image_data: '',
		image_url : '',
		// First page has index = 1
		index: 1,

		templateStep1: step1Template,

		templateStep2: step2Template,

		templateStep3: step3Template,

		bigSelf: this,

		initialize: function() {
			this.model = new PointerModel();
			console.log('[ListView] this view is initialized');
		},

		events: {
			'click .gotoStep1': 'clickOnGotoStep1',
			'click .selectImage': 'clickOnSelectImage',
			'click .gotoStep2': 'clickOnGotoStep2',
			'click .gotoStep3': 'clickOnGotoStep3',
			'click .saveReport': 'clickOnSaveReport'
		},

		render: function() {
			var self = this;
			if(this.index == 1) {
				// Render Step 1
				this.renderStep1();
			} else if(this.index == 2) {
				// Render Step 2
				this.renderStep2();
			} else {
				this.renderStep3();
			}
			$('.ui-page-active').page("destroy").page();
			// Need to recreate the page once the thing is loaded
			// this.$el.page('destroy').page();
			//this.$el.page.trigger('create');
			// Currently the return does nothing
			console.log('[PostPointerView] Rendering Complete for index ' + this.index);
			return this;
		},

		renderStep1: function() {
			var self = this;
			var compiledHtml = _.template(self.templateStep1, {});
			this.$el.html(compiledHtml);
		},

		renderStep2: function() {
			var self = this;
			var compiledHtml = _.template(self.templateStep2, {});
			this.$el.html(compiledHtml);
		},

		renderStep3: function() {
			var self = this;
			var compiledHtml = _.template(self.templateStep3, {});
			this.$el.html(compiledHtml);
		},

		//
		// EVENTS HANDLERS 
		// 
		clickOnGotoStep1: function() {
			// Do some saving of data
			// Redirect
			this.index = 1;
			this.render();
		},

		clickOnGotoStep2: function() {
			// Do some saving
			var self = this;
			// console.log(this.onImageUploaded);
			this.model.set('category', $('#category').val());
			// Redirect
			this.index = 2;
			this.render();
		},

		clickOnGotoStep3: function() {
			var self = this;
			// if(!this.model.get('img_url')) {
			// 	this.model.set('img_url', "http://lorempixel.com/500/400");
			// }
			this.index = 3;
			this.render();
		},

		clickOnSaveReport: function() {
			var this_ = this;
			this.model.set('timestamp', new Date());
			this.model.set('img_url', Uploader.getImageURL());
			var description = $("#description").val();
			// console.log("Description is " + description);
			this.model.set('description', description);
			navigator.geolocation.getCurrentPosition(function(position) {
				var position = position;
				console.log(position);
				this_.model.set('latitude', position.coords.latitude);
				this_.model.set('longitude', position.coords.longitude);
				this_.model.set('altitude', position.coords.accuracy);
				this_.model.set('altitude_accuracy', position.coords.altitudeAccuracy);
        		this_.model.set('accuracy', position.coords.accuracy);
				this_.model.save(
				null, {
					success: function(model, response) {
						console.log("Successfully saved the model");
						// Navigate to a different scene
						alert("Successfully Saved");
						window.app_router.navigate('index.html');
					},
					error: function(model, response) {
						console.log("could not save the model");
						console.log(response);
					}
				});

			}, function onError() {
				// alert("Failed to get the location of your position");
				//Testing purposes, please remove this
				this_.model.set('latitude', 1);
				this_.model.set('longitude', 2);
				this_.model.set('altitude', 3);
				this_.model.set('altitude_accuracy', 4);
        		this_.model.set('accuracy', 5);
				this_.model.save(
				null, {
					success: function(model, response) {
						console.log("Successfully saved the model");
						// Navigate to a different scene
						alert("Successfully Saved");
						window.app_router.navigate('index.html');
					},
					error: function(model, response) {
						console.log("could not save the model");
						console.log(response);
					}
				});
			});

			console.log(this.model);
		},


		onImageUploaded: function(image_url, message) {
			console.log("[onImageUploaded] "  + message + " " + image_url);
			$('#attachment-area').css('display', 'block');
			$('#attachment-img').attr('src', 'data:image/png;base64,' + Uploader.getImageData());	
		},


		clickOnSelectImage: function() {
			var self = this;
			// PHONE GAP Associated Settings
			$('<div>').simpledialog2({
				mode: 'button',
				headerText: 'Attach Photo',
				headerClose: true,
				buttonPrompt: 'Please Choose One',
				buttons: {
					'Take a Photo': {
						click: function() {
							//self.onImageSelected("R0lGODlhDwAPAKECAAAAzMzM/////wAAACwAAAAADwAPAAACIISPeQHsrZ5ModrLlN48CXF8m2iQ3YmmKqVlRtW4MLwWACH+H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw==", "Sucess");
							Uploader.getPhotoFromCamera(self.onImageUploaded);
						},
						theme: "d"
					},
					//Comment out for Blackberry Porting
					'Choose from Library': {
						click: function() {
							Uploader.getPhotoFromLibrary(self.onImageUploaded);
						},
						theme: "d"
					}
				}
			});
		},
	});

	return PostPointerView;
});

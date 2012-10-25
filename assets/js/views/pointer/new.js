define(['jquery', 'underscore', 'backbone', 'jqueryui', 'models/pointer/item', 'text!templates/pointer/new.html', 'text!templates/pointer/postPointer/step1.html', 'text!templates/pointer/postPointer/step2.html', 'upload', 'simpleDialog'],
// Uploader

function($, _, Backbone, 
	jQueryUI, PointerModel, postMapPointerTemplate, step1Template, step2Template, Uploader, simpledialog2) {

	var PostPointerView = Backbone.View.extend({

		el: $("#new"),

		model: PointerModel,

		// Temporary vars needed to store shit
		image_data: '',

		// First page has index = 1
		index: 1,

		templateStep1: step1Template,

		templateStep2: step2Template,

		template: postMapPointerTemplate,

		initialize: function() {
			this.model = new PointerModel();
			console.log('[ListView] this view is initialized');
		},

		events: {
			'click .gotoStep1': 'clickOnGotoStep1',
			'click .selectImage': 'clickOnSelectImage',
			'click .gotoStep2': 'clickOnGotoStep2',
			'click .saveReport': 'clickOnSaveReport'
		},

		render: function() {
			var self = this;
			if(this.index == 1) {
				// Render Step 1
				this.renderStep1();
			} else {
				// Render Step 2
				this.renderStep2();
			}
			// Need to recreate the page once the thing is loaded
			this.$el.page('destroy').page();
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
			this.model.set('category', $('#category').val());
			this.model.set('description', $('#description').val());
			// Redirect
			this.index = 2;
			this.render();
		},

		clickOnSaveReport: function() {
			this.model.set('latitude', $('#latitude').val());
			this.model.set('longitude', $('#longitude').val());
			console.log(this.model);

			this.model.save(
			null, {
				success: function(model, response) {
					console.log("Successfully saved the model");
					// Navigate to a different scene
					alert("Successfully Saved");
					window.app_router.navigate('');
				},
				error: function(model, response) {
					console.log("could not save the model");
					console.log(response);
				}
			});
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
							Uploader.getPhotoFromCamera(self.onImageSelected);
							//takePicture();
						},
						theme: "d"
					},
					//Comment out for Blackberry Porting
					'Choose from Library': {
						click: function() {
							Uploader.getPhotoFromLibrary(self.onImageSelected);
						},
						theme: "d"
					}
				}
			});
		},

		onImageUploaded: function(image_url, message) {
			alert("111");
			console.log("Called" + image_url);
			if(image_url.length > 1) {
				alert('Image uploaded' + image_url);
				this.model.set('image_url', image_url);
			} else {
				alert('image failed to upload');
			}
		},
		
		onImageSelected: function(image_data, message) {
			var self = this;
			self.image_data = image_data;
			if(message.length > 1) {
				$('#attachment-area').css('display', 'block');
				$('#attachment-img').attr('src', 'data:image/png;base64,' + image_data);
				Uploader.upload(self.image_data, self.onImageUploaded);
				//router.postQuestionView.model.set({attachmentPic:image_data});
				//$('#attachment-img').attr('src',image_data);
				//$('#attachment-img-bk').attr('src',image_data);
			}
		}

	});

	return PostPointerView;
});
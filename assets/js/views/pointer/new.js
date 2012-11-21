define(['jquery', 'underscore', 'backbone', 'jqueryui', 
	'models/pointer/item', 
	'text!templates/pointer/postPointer/step1.html', 
	'text!templates/pointer/postPointer/step2.html', 
	'text!templates/pointer/postPointer/step3.html', 
	'upload', 
	'simpleDialog'],
// Uploader

function($, _, Backbone, 
	jQueryUI, PointerModel,  
	step1Template, 
	step2Template, 
	step3Template, 
	Uploader, simpledialog2) {

	var PostPointerView = Backbone.View.extend({

		el: $("#content"),

		model: PointerModel,

		// Temporary vars needed to store shit
		image_data: '',

		// First page has index = 1
		index: 1,

		templateStep1: step1Template,

		templateStep2: step2Template,

		templateStep3: step3Template,


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
			} else if (this.index == 2) {
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
			this.model.set('category', $('#category').val());
			// Redirect
			this.index = 2;
			this.render();
		},

		clickOnGotoStep3: function() {
			var self = this;
			this.index = 3;
			this.render();
		},

		clickOnSaveReport: function() {
			this.model.set('latitude', $('#latitude').val());
			this.model.set('longitude', $('#longitude').val());
			this.model.set('timestamp', new Date().getTime());

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
			console.log("[onImageUploaded] Image Url" + image_url);
			if(image_url.length > 1) {
				alert('Image uploaded' + image_url);
				this.model.set('img_url', image_url);
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
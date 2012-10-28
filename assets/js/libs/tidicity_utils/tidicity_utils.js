/*
Copyright (c) 2012 by Mohit Singh kanwal.  All Rights Reserved.
*/
define([], function() {

   // return a value that defines the module export
   // Module containing various utility functions
   // create your module here
   var Utils = {
      /**
       * Follow a template of exporting functions properly
       * someFunction: function (args...) {
       *    // Function Body ...
       * }
       *
       * To access this function use
       *
       * Utils.someFunction(...)
       *
       */
      // onSuccess Callback
      //   This method accepts a `Position` object, which contains
      //   the current GPS coordinates
      //
      onLocationSuccess: function(position) {
         alert('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n' + 'Altitude: ' + position.coords.altitude + '\n' + 'Accuracy: ' + position.coords.accuracy + '\n' + 'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' + 'Heading: ' + position.coords.heading + '\n' + 'Speed: ' + position.coords.speed + '\n' + 'Timestamp: ' + new Date(position.timestamp) + '\n');
      },

      // onError Callback receives a PositionError object
      //
      onLocationError: function(error) {
         alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
      },

      getCurrentPosition: function(onSuccess, onError) {
         navigator.geolocation.getCurrentPosition(onSuccess, onError);
      }
   }

   return Utils;
});
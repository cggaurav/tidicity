// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone ){
  var AppRouter = Backbone.Router.extend({
    routes: {

      // Define custom routes
      // Default
      '*actions': 'defaultAction'
    }
  });
  var initialize = function(){
    var app_router = new AppRouter;
    // app_router.on('route:showMap', function(){
    //   require(['views/map'], function(ProjectListView) {
    //     // Call render on the module we loaded in via the dependency array
    //     // 'views/projects/list'
    //     var projectListView = new ProjectListView();
    //     projectListView.render();
    //   })
    // });

    // app_router.on('route:showUsers', function () {
    //   require(['views/users/list'], function(UserListView) {
    //     // As above, call render on our loaded module
    //     // 'views/users/list'
    //     var userListView = new UserListView();
    //     userListView.render();
    //   });
    // });
    app_router.on('route:defaultAction', function (actions) {
      console.log('routing started');
      require(['views/map'], function(MainHomeView) {
      // We have no matching route, lets display the home page 
        var mainHomeView = new MainHomeView();
        mainHomeView.render();

        // Render a point
        require(['views/pointer/item', 'models/pointer/item'], function(PointerView, PointerModel) {
          var x = new PointerModel();
          var pointerView = new PointerView({model: x});
          pointerView.render();
        });
      });
    });
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});

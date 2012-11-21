// Filename: router.js
define(['jquery', 'underscore', 'backbone'], 
  function($, _, Backbone) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      'new': 'showNewReportView',
      // Define custom routes
      // Default
      'main' : 'defaultAction',
      '*actions': 'defaultAction'
    }
  });
  var initialize = function() {
      window.app_router = new AppRouter;
      // app_router.on('route:showMap', function(){
      //   require(['views/map'], function(ProjectListView) {
      //     // Call render on the module we loaded in via the dependency array
      //     // 'views/projects/list'
      //     var projectListView = new ProjectListView();
      //     projectListView.render();
      //})
      //});
      app_router.on('route:showNewReportView', function() {
        require(['views/pointer/new'], function(PostPointerView) {
          // As above, call render on our loaded module
          var newPointerView = new PostPointerView();
          newPointerView.render();
        });
      });
      app_router.on('route:defaultAction', function(actions) {
        console.log('routing started');
        require(['views/map'], function(MainHomeView) {
          // We have no matching route, lets display the home page 
          var mainHomeView = new MainHomeView();
          mainHomeView.render();

          // Render some points
          require(['views/pointer/list', 'models/pointer/item', 'models/pointer/list'], function(PointerListView, PointerModel, PointerModelList) {
            // var x = new PointerModel({latitude: 1.3, longitude:103.7});
            // var y = new PointerModel({latitude: 1.3, longitude:102.7});
            // var z = new PointerModel({latitude: 1.3, longitude:101.7});
            var aList = new PointerModelList();
            aList.fetch();
            var pointerListView = new PointerListView({
              model: aList
            });
            pointerListView.render();
          });
        });
      });
      Backbone.history.start();
    };
  return {
    initialize: initialize
  };
});
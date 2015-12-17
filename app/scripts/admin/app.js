requirejs.config({
	paths: {
		angular: '../angular',
		uiRouter: '../angular-ui-router',
		jquery: '../jquery.min',
		angularResource: '../angular-resource',
		angularFileupload: '../angular-file-upload'
    },
    shim: {
        'jquery': {
            exports: 'jquery'
        },
        'angular': {
        	deps: ['jquery'],
            exports: 'angular'
        },
        'uiRouter': {
        	deps: ['angular'],
            exports: 'uiRouter'
        },
        'angularResource': {
        	deps: ['angular'],
            exports: 'angularResource'
        },
        'angularFileupload': {
        	deps: ['angular'],
            exports: 'angularFileupload'
        }
    }
});

require( [
          'angular',
          'uiRouter',
          'angularResource',
          'modules/ActivityModule',
          'angularFileupload'
          ], function(angular) {
	
	angular.bootstrap(document, ["ActivityModule"])
	
});
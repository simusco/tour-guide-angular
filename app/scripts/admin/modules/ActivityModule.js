define([
        'angular',
        '../controllers/BaseInfoViewController',
        '../controllers/GoodnessViewController',
        '../controllers/ImageViewController',
        '../controllers/ActivityExtraViewController',
        '../controllers/TicketViewController',
        '../controllers/TopicViewController',
        '../controllers/SearchViewController',
        '../controllers/OrderViewController'
        ], function(
		angular, 
		baseInfoViewController, 
		goodnessViewController, 
		imageViewController, 
		activityExtraViewController, 
		ticketViewController, 
		topicViewController,
		searchViewController,
		orderViewController
        ) {
	
	var module = angular.module('ActivityModule',['ui.router','ngResource','angularFileUpload']);

	module.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.when("", "/nav");
		
		$stateProvider.state('nav', {
	      url: "/nav",
	      templateUrl: "nav.html"
	    }).state('nav.baseInfo', {
	      url: "/baseInfo",
	      templateUrl: "baseInfo.html"
	    }).state('nav.image', {
		      url: "/image",
		      templateUrl: "image.html"
	    }).state('nav.goodness', {
	      url: "/goodness",
	      templateUrl: "goodness.html"
	    }).state('nav.extra', {
	      url: "/extra",
	      templateUrl: "extra.html"
	    }).state('nav.ticket', {
	      url: "/ticket",
	      templateUrl: "ticket.html"
	    }).state('nav.topic', {
	      url: "/topic",
	      templateUrl: "topic.html"
	    }).state('nav.search', {
	      url: "/search",
	      templateUrl: "search.html"
	    }).state('nav.order', {
	      url: "/order",
	      templateUrl: "order.html"
	    });
	});
	
	module.controller('BaseInfoViewController', baseInfoViewController);
	module.controller('GoodnessViewController', goodnessViewController);
	module.controller('ImageViewController', imageViewController);
	module.controller('ActivityExtraViewController', activityExtraViewController);
	module.controller('TicketViewController', ticketViewController);
	module.controller('TopicViewController', topicViewController);
	module.controller('SearchViewController', searchViewController);
	module.controller('OrderViewController', orderViewController);
	
	return module;
	
});
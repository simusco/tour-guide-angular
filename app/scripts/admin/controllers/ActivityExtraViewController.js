define(['angular'], function(angular) {    
	
	var ctrl = ['$scope','$resource', function($scope, $resource){
		
		var ActivityExtra = $resource('/activity/extra', {}, {'update': { method:'PUT' }}),
			extra = $scope.activityExtra = {};
		
		$scope.saveRec = function(){
			ActivityExtra.save(extra, function(resp){
				var data = resp.object;
				var flag = resp.flag;
				
				if(flag){
					console.log(data);
					alert("保存数据成功!");
				}
				
			});
		}
		
	}];
	
	return ctrl;
	
});
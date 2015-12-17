define(['angular'], function(angular) {
	
	var ctrl = ['$scope','$resource', '$http', function($scope, $resource, $http){
		var params = $scope.params = {},
			Search = $resource('/search', {}, {'update': { method:'PUT' }});
		
		$scope.search = function(){
			
			Search.get(params, function(resp){
				var data = resp.object;
				var flag = resp.flag;
				
				if(flag){
					$scope.resultList = data;
				}
			});
			
		}
		
		$scope.deleteImage = function(array, imageId){
			$http['delete']('/image/'+imageId).success(function(resp){
				var data = resp.object;
				var flag = resp.flag;
				
				if(flag){
					var index = -1;
					for(var i=0;i<array.length;i++){
						var aa = array[i];
						if(aa.imageId == imageId){
							index = i;
						}
					}
					array.splice(index,1);
					alert("操作成功!");
				}
			});
		};
		
		$scope.deleteTicket = function(array, ticketId){
			$http['delete']('/ticket/'+ticketId).success(function(resp){
				var data = resp.object;
				var flag = resp.flag;
				
				if(flag){
					var index = -1;
					for(var i=0;i<array.length;i++){
						var aa = array[i];
						if(aa.ticketId == ticketId){
							index = i;
						}
					}
					array.splice(index,1);
					alert("操作成功!");
				}
			});
		};
		
		$scope.deleteGoodness = function(array, goodnessId){
			$http['delete']('/activity/goodness/'+goodnessId).success(function(resp){
				var data = resp.object;
				var flag = resp.flag;
				
				if(flag){
					var index = -1;
					for(var i=0;i<array.length;i++){
						var aa = array[i];
						if(aa.goodnessId == goodnessId){
							index = i;
						}
					}
					array.splice(index,1);
					alert("操作成功!");
				}
			});
		};
		
		$scope.deleteExtra = function(array, extraId){
			$http['delete']('/activity/extra/'+extraId).success(function(resp){
				var data = resp.object;
				var flag = resp.flag;
				
				if(flag){
					var index = -1;
					for(var i=0;i<array.length;i++){
						var aa = array[i];
						if(aa.activityExtraId == extraId){
							index = i;
						}
					}
					array.splice(index,1);
					alert("操作成功!");
				}
				
			});
		};
	}];
	
	return ctrl;
	
});
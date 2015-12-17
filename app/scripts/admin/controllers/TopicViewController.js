define(['angular'], function(angular) {    
	
	var ctrl = ['$scope','$resource', function($scope, $resource){
		
		var Topic = $resource('/topic', {}, {'update': { method:'PUT' }}),
			topic = $scope.topic = {'activities':[
			                                      {'activityId':'0'},
			                                      {'activityId':'1'},
			                                      {'activityId':'2'},
			                                      {'activityId':'3'},
			                                      {'activityId':'4'},
			                                      {'activityId':'5'},
			                                      {'activityId':'6'}
			                                     ]};
		
		$scope.saveTopic = function(){
			
			topic.activityIds = [];
			for(var i=0;i<topic.activities.length;i++){
				topic.activityIds.push(topic.activities[i].activityId);
			}
			
			Topic.save(topic, function(resp){
				console.log(resp);
				
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
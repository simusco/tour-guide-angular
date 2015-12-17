define(['angular'], function(angular) {
	
	var ctrl = ['$scope','$resource', function($scope, $resource){
		
		var ActivityPlan = $resource('/activity/plan/:id', {'id' : '@id'}, {'update': { method:'PUT' }});
		var Tag = $resource('/tags/QUERY/all');
		
		$scope.activityPlan = {};
		Tag.get(function(resp){
			var data = resp.object;
			var flag = resp.flag;
			
			if(flag){
				var subTags = [];
				var plist = [];
				
				for(var i=0;i<data.length;i++){
					var d = data[i];
					
					if(d.parentId == '-1' && d.type != 'ORDER'){
						var t = {'tagId':d.tagId,'tag':d.tag, 'subTags' : []};
						plist.push(t);
					}
				}
				
				for(var i=0;i<data.length;i++){
					var d = data[i];
					
					for(var j=0;j<plist.length;j++){
						var p = plist[j];
						
						if(p.tagId == d.parentId){
							d.checked = false;
							p.subTags.push(d);
						}
					}
				}
				
				$scope.tags = [];
				for(i=0;i<plist.length;i++){
					var p = plist[i];
					$scope.tags.push({'tag' : p.tag, 'subTags':p.subTags});
				}
			}
		});
		
		
		$scope.save = function(){
			var activityPlanId = $scope.activityPlan.activityPlanId, 
								 selectedTags = [], 
								 activityTagList=[];
			$scope.activityPlan.activityTagList = activityTagList;
			
			for(var i=0;i<$scope.tags.length;i++){
				var tagObj = $scope.tags[i];
				for(var j=0;j<tagObj.subTags.length;j++){
					var subTag = tagObj.subTags[j];
					if(subTag.checked){
						var t = {'tagId':subTag.tagId,'tagName':subTag.tag};
						activityTagList.push(t);
					}
				}
			}
			
			if(activityPlanId != null && activityPlanId != ''){
				ActivityPlan.update($scope.activityPlan, function(resp){
					var data = resp.object;
					var flag = resp.flag;
					
					if(flag){
						console.log(data);
						alert("保存数据成功!");
					}
				});
			}else{
				ActivityPlan.save($scope.activityPlan, function(resp){
					var data = resp.object;
					var flag = resp.flag;
					
					if(flag){
						console.log(data);
						alert("保存数据成功!");
					}
				});
			}
			
			
		}
		
		$scope.loadActivityPlan = function(event){
			
			if(event.keyCode == 13){
				var activityPlanId = $scope.activityPlan.activityPlanId;
				if(activityPlanId != null){
					ActivityPlan.get({'id':activityPlanId}, function(resp){
						var data = resp.object;
						var flag = resp.flag;
						
						if(flag){
							//选中标签
							selectedTags(data);
							//显示数据
							$scope.activityPlan = data;
						}
					});
				}
			}
			
		}
		
		function selectedTags(data){
			var list = data.activityTagList,ids=[];
			for(var m=0;m<list.length;m++){
				ids.push(list[m].tagId);
			}
			
			for(var i=0;i<$scope.tags.length;i++){
				var tagObj = $scope.tags[i];
				for(var j=0;j<tagObj.subTags.length;j++){
					var subTag = tagObj.subTags[j];
					
					//检查数组中是否存在
					if($.inArray(subTag.tagId, ids) != -1){
						subTag.checked =  true;
					}
				}
			}
		}
		
	}];
	
	return ctrl;
	
});
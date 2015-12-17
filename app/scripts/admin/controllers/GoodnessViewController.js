define(['angular'], function(angular) {    
	
	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	function generateMixed(n) {
	     var res = "";
	     for(var i = 0; i < n ; i ++) {
	         var id = Math.ceil(Math.random()*35);
	         res += chars[id];
	     }
	     return res;
	}
	
	var ctrl = ['$scope','$resource', function($scope, $resource){
		
		var Goodness = $resource('/activity/goodness', {}, {'update': { method:'PUT' }}),
		goodness = $scope.goodness = {};
		goodness.anchor = generateMixed(8);

		$scope.saveGoodness = function(){
			
			Goodness.save(goodness, function(resp){
				
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
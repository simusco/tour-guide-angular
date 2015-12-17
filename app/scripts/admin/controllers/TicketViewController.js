define(['angular'], function(angular) {    
	
	var ctrl = ['$scope','$resource', function($scope, $resource){
		
		var Ticket = $resource('/ticket', {}, {'update': { method:'PUT' }}),
			ticket = $scope.ticket = {};
			ticket.ticketDetailList = [
			                           {'groupCode':'group1','type':'HOTEL','shList':[],'isDisplay':'yes','isPay':'yes','quantity':1},
			                           {'groupCode':'group1','type':'SPOT','shList':[],'isDisplay':'no','isPay':'yes','quantity':1},
			                           {'groupCode':'group2','type':'HOTEL','shList':[],'isDisplay':'yes','isPay':'yes','quantity':1},
			                           {'groupCode':'group2','type':'SPOT','shList':[],'isDisplay':'no','isPay':'yes','quantity':1}
			                          ];
		
		var hotelList = [];
		var spotList = [];
		var loadHotelAndSpot = function(){
			var HotelAndSpot = $resource('/ticket/load/hotel-spot');
			HotelAndSpot.get(function(resp){
				var data = resp.object;
				var flag = resp.flag;
				
				if(flag){
					hotelList = data.hotelList;
					spotList = data.spotList;
					
					ticket.ticketDetailList[0].shList = data.hotelList;
					ticket.ticketDetailList[1].shList = data.spotList;
					ticket.ticketDetailList[2].shList = data.hotelList;
					ticket.ticketDetailList[3].shList = data.spotList;
				}
			});
		}

		//初始化load基础数据
		loadHotelAndSpot();
			
		$scope.saveTicket = function(){
			Ticket.save(ticket, function(resp){
				var data = resp.object;
				var flag = resp.flag;
				
				if(flag){
					console.log(data);
					alert("保存数据成功!");
				}
			});
		}
		
		$scope.changeType = function(ticketDetail, type){
			
			if(type == 'HOTEL'){				
				ticketDetail.shList = hotelList;
				ticketDetail.code1 = '';
				ticketDetail.code2 = '';
				ticketDetail.name = '';
				ticketDetail.description = '';
			}else if(type == 'SPOT'){
				ticketDetail.shList = spotList;
				ticketDetail.code1 = '';
				ticketDetail.code2 = '';
				ticketDetail.name = '';
				ticketDetail.description = '';
			}
			
		}
		
		$scope.changeSh = function(ticketDetail, code){
			
			var shList = ticketDetail.shList;
			var sh = null;
			
			for(var i=0;i<shList.length;i++){
				if(shList[i].code == code){
					sh = shList[i];
					break;
				}
			}
			
			if(sh == null) return;
			
			if(ticketDetail.type == 'HOTEL'){
				ticketDetail.code1 = sh.hotelCode;
				ticketDetail.code2 = sh.ratePlanCode;
				ticketDetail.name = sh.name;
				ticketDetail.description = sh.description;
			}else if(ticketDetail.type == 'SPOT'){
				ticketDetail.code1 = sh.spotCode;
				ticketDetail.code2 = sh.resourceCode;
				ticketDetail.name = sh.name;
				ticketDetail.description = sh.description;
			}
		}
		
	}];
	
	return ctrl;
	
});
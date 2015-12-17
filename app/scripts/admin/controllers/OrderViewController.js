define(['angular'], function(angular) {    
	
	var ctrl = ['$scope','$resource', function($scope, $resource){
		
		var queryParams = $scope.queryParams = {};
		$scope.orders = [];//未处理订单
		$scope.selectedOrder = {};
		
		$scope.hotels = [];//酒店
		$scope.spots = [];//门票
		$scope.visitors = [];
		
		$scope.query = function(){
			var OrderDraw = $resource('/orderDraw/query');
			OrderDraw.get(queryParams,function(resp){
				var data = resp.object;
				var flag = resp.flag;
				
				if(flag){
					console.log(data.total);
					console.log(data.pageSize);
					
					$scope.orders = data.list;
				}
			});
		};
		
		$scope.detail = function(order, orderId){
			var OrderDraw = $resource('/orderDraw/detail');
			OrderDraw.get({'orderId' : orderId},function(resp){
				var data = resp.object;
				var flag = resp.flag;
				
				if(flag){
					console.log(data.hotels);
					console.log(data.spots);
					
					$scope.selectedOrder = order;
					$scope.visitors = data.visitors;
					$scope.hotels = data.hotels;
					$scope.spots = data.spots;
					
					displayRowColor($scope.orders, {'key':'orderId','value':orderId});
				}
			});
		}
		
		$scope.bookSpot = function(scenicId,productId,ticketId){
			alert(scenicId+'-'+productId+'-'+ticketId);
			window.open (
						'http://piao.ctrip.com/Thingstodo-Booking-bookingwebsite/TicketOrderInput?scenicID='+scenicId+'&productID='+productId+'&ticketID='+ticketId,'',
						'height=768,width=1024,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=yes, status=no') 
		};
		
		$scope.bookHotel = function(hotelId,room, hotel){
			window.open (
						'http://hotels.ctrip.com/Domestic/ShowHotelInformation.aspx?hotel='+hotelId,"",
						'height=768,width=1024,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=yes, status=no') 
		};
		
		$scope.submit = function(){
			var o = $scope.selectedOrder;
			var orderDraw = {};
			
			orderDraw.orderId = o.orderId;
			orderDraw.isDraw = o.isDraw;
			orderDraw.spotDraws = $scope.spots;
			orderDraw.hotelDraws = $scope.hotels;
			
			var OrderDrawCtrl = $resource('/orderDraw', {}, {'update': { method:'PUT' }});
			OrderDrawCtrl.save(orderDraw, function(resp){
				var data = resp.object;
				var flag = resp.flag;
				
				if(flag){
					alert("保存数据成功!");
				}
				
			});
		};
		
		function displayRowColor(list, values){
			
			for(var i=0;i<list.length;i++){
				list[i].style = {};
				
				var oid = list[i][values.key];
				if(oid == values.value){
					list[i].style = {'backgroundColor':'yellow'};
				}
			}
			
		}
	}];
	
	return ctrl;
	
});
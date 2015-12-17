define(['angular'], function(angular) {    
	
	var ctrl = ['$scope', 'FileUploader', function($scope, FileUploader){
		
		var image = $scope.image = {},
			uploader = $scope.uploader = new FileUploader({
				url: '/image/upload/:id/:type'
			});

        // FILTERS

		uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        	alert("System only support Image file.");
        	
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        
        uploader.onBeforeUploadItem = function(item) {
        	
        	var id = image.ownerId,type=image.type;
        	if(id == null || type == null){
        		uploader.cancelAll();
        		alert('You must input ID and LOCATON.');
        		
        		return;
        	}
        	
        	item.url = item.url
        	.replace(':id',id)
        	.replace(':type',type);
        
            console.info('onBeforeUploadItem', item);
        };
        
        /*
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };*/

        console.info('uploader', uploader);
		
	}];
	
	return ctrl;
	
});
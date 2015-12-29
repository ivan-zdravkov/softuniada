'use strict';

app.factory('mailService', ['authSettings', 'queryService',	function (authSettings, queryService) {

	var serviceBase = authSettings.baseUri;

	var _sendMail = function (message) {
		var resourceURL = serviceBase + '/api/Mail/SendMail';
        var promise = queryService.post(resourceURL, message, 'UTC');

        return promise;
	};

	return {
		sendMail: _sendMail
	};
}]);
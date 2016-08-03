angular.module('service.api', [])

.factory('Api', function ($http) {

	var API = 'http://localhost:8080/api_estacio/api/index.php/listArea';

	return {

		getApi: function() {
			return $http({
				url: API,
				method: 'GET'
			})
		}

	};
})
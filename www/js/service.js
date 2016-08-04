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

	 /*return $resource("./php/notes/:id", {}, {
        save : { // redefine save action defaults
            method : 'POST',
            url : "./php/notes", // I dont want the id in the url
            transformRequest: function(data, headers){
                console.log(headers);
                headers = angular.extend({}, headers, {'Content-Type': 'application/json'});
                console.log(headers);
                console.log(data);
                console.log(angular.toJson(data));
                return angular.toJson(data); // this will go in the body request
            }               
        }
    });*/


})
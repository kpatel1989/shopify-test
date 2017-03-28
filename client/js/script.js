var shopifyApp = angular.module("shopifyApp",[]);
shopifyApp.controller('MainController', ['$http','$scope', 
	function($http,$scope){
		$http.get("/products")
			.then(function(res) {
				$scope.products = res.data;	
			});
		$scope.buy = function(productId) {
			$http.delete("/products/"+productId)
				.then(function(res){
					console.log(res.data);
				});
		}
}]);

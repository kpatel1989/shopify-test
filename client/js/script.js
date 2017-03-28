var shopifyApp = angular.module("shopifyApp",[]);
shopifyApp.controller('MainController', ['$http','$scope', 
	function($http,$scope){
		$http.get("/products")
			.then(function(res) {
				$scope.products = res.data;	
			});
		$scope.buy = function(variantId) {
			$http.post("/product/buy",{
				variantId : variantId,
				quantity: 1,
				discount : 0.25
			})
				.then(function(res){
					console.log(res.data);
				});
		}
}]);

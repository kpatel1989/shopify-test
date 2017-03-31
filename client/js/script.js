var shopifyApp = angular.module("shopifyApp",[]);
shopifyApp.controller('MainController', ['$http','$scope', 
	function($http,$scope){
		$http.get("/products")
			.then(function(res) {
				$scope.products = res.data;	
			});
		$scope.updateStockQty = 0;
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
		$scope.update = function(variant) {
			$http.post("/product/addInventory",{
				variantId : variant.id,
				quantity: variant.updateStockQty,
			})
			.then(function(res){
				alert("Stock Updated");
				console.log(res.data);
			});
		}
}]);

var addressApp = angular.module('addressApp', []);

function MainController($scope, $http) {

	// INITIALIZE APP

    // when landing on the page, get all addresses and show them
	$http.get('/api/addresses')
		.success(function(data) {
			$scope.addresses = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

    // Init formData scope for communicate between html and controller
	$scope.formData = {};

	// when submitting the set form, send the form to the node API
	$scope.setAddress = function() {

		if ($scope.formData._id) { // fetch data if it has '_id' data then it will be updating address

			// update selected address
			$http.put('/api/address/' + $scope.formData._id, $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.addresses = data; 
					$scope.updating = false; // when update fn is succeed then set updating value to false
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});

		} else {

			// create new address
			$http.post('/api/address', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.addresses = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
		
	};

	// set edit selected address
	$scope.editAddress = function(id) {
		$scope.updating = true; // change title from new address to update address

		// get selected address for update it
		$http.get('/api/address/' + id)
			.success(function(data) {
				$scope.formData = data[0];
				$scope.updateRegions(data[0].City); // when fn is succeed then region for selected city
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete an address 
	$scope.deleteAddress = function(id) {

		// ask user are you sure delete for this item
		var c = confirm("Kayıtlı adresı silmek istediğinizden emin misiniz?");

		// if selected true then delete address
		if (c) { 
			$scope.clearForm(); // clear form before deleting an address

			$http.delete('/api/address/' + id)
				.success(function(data) {
					$scope.addresses = data;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
		
	};

	// clear form data
	$scope.clearForm = function() {
		$scope.formData = {};
		$scope.updating = false;
	};

}

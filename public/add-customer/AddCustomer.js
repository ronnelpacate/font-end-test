(function () {
    angular.module('qudini.QueueApp')
        .directive('addCustomer', AddCustomer)


    function AddCustomer($http){
        return {
            restrict: 'E',
            scope:{
                onAdded: '&'
            },
            templateUrl:'/add-customer/add-customer.html',
            link: function(scope){

                scope.products = [
                    {name: 'Grammatical advice'},
                    {name: 'Magnifying glass repair'},
                    {name: 'Cryptography advice'}
                ];

                scope.addCustomer = function() {
                    $http.post('/api/customer/add', {name: scope.name, product: {name: scope.product.name}, joinedTime: new Date().toString()})
                        .success(function(res) {
                            scope.onAdded()();
                        }); 
                };
            }
        }
    }

})()


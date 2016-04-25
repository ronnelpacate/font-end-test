(function () {
    angular.module('qudini.QueueApp')
        .directive('customer', Customer);

    angular.module('qudini.QueueApp').filter('moment', function () {
        return function (input, momentFn /*, param1, param2, ...param n */) {
            var args = Array.prototype.slice.call(arguments, 2),
                momentObj = moment(input);
            return momentObj[momentFn].apply(momentObj, args);
        };
    });

    /**
     * The <customer> directive is responsible for:
     * - serving customer
     * - calculating queued time
     * - removing customer from the queue
     */
    function Customer($http){

        return{
            restrict: 'E',
            scope:{
                customer: '=',

                onRemoved: '&',
                onServed: '&'
            },
            templateUrl: '/customer/customer.html',
            link: function(scope){
                scope.queuedTime = new Date - new Date(scope.customer.joinedTime);
                   
                scope.remove = function() {
                    $http({
                        method: 'DELETE',
                        url: '/api/customer/remove',
                        params: {id: scope.customer.id}
                    }).then(function(res){
                        scope.onRemoved()()
                    })
                };

                scope.serveCustomer = function() {
                    $http.post('/api/customer/serve', {id: scope.customer.id})
                        .success(function(res) {
                            scope.onServed()();
                        }); 
                };
            }
        }
    }

})();


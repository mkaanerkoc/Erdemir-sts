angular.module('MainCtrl', []).controller('MainController', function($scope,$http) {

    $scope.tagline = 'Nothing beats a pocket protector!';
    $scope.formData = {};
    $scope.greetingsMsg = "Hello from wOrld!";

    $http.get('/api/2/?from=2017-04-28T13:00:00&to=2017-04-28T14:30:00')
        .then(function(data) {
            $scope.todos = data.data;
            console.log(data.data);
        },
        function(err) {
            console.log('Error: ' + err);
        });

});

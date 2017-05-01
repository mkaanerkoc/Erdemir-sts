angular.module('ChannelCtrl', []).controller('ChannelController', function($scope) {

    $scope.tagline = 'Nothing beats a pocket protector!';
    $scope.formData = {};
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .then(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            },
            function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .then(function(data) {
                $scope.todos = data;
                console.log(data);
            }
            ,function(data) {
                console.log('Error: ' + data);
            });
    };

    // NORMAL RUN //
    $http.get('/api/todos')
        .then(function(data) {
            $scope.todos = data;
            console.log(data);
        },
        function(data) {
            console.log('Error: ' + data);
        });

});


angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) { })

.controller('AccountCtrl', function ($scope) { })

.controller('PostDetailCtrl', function ($scope, $stateParams, $http) {
    $scope.post = [];
    $http.get('http://localhost:8000/all/' + $stateParams.Id).then(function (data) {
        $scope.post = data.data[0];
    })
})

.controller('PostCtrl', function ($http, $scope, $ionicPopup, $cordovaNetwork) {
    localStorage['LocalPost'] = localStorage['LocalPost'] != null ? localStorage['LocalPost'] : [];
    localStorage['StartTime'] = localStorage['StartTime'] != null ? localStorage['StartTime'] : '2016-01-01 01:00:00';
    var temp = [];
    $scope.post = [];
 
    if ($cordovaNetwork.isOffline()) {
        $ionicPopup.confirm({
            title: "Internet is not working",
            content: "Internet is not working on your device"
        });
    }

   
    if ($cordovaNetwork.isOnline()) {
        $http.get('http://localhost:8000/alltime/' + localStorage['StartTime']).then(function (data) {
            if (data.data.length != 0) {

                localStorage['StartTime'] = data.data[0].created_at;
                $.each(data.data, function (key, value) {
                    temp.push(value);
                });
                if (localStorage['LocalPost'] == "") {
                    localStorage['LocalPost'] = '[' + JSON.stringify(temp).substr(1, ((JSON.stringify(temp)).length) - 2) + ']';
                }
                else {
                    localStorage['LocalPost'] = '[' + JSON.stringify(temp).substr(1, ((JSON.stringify(temp)).length) - 2) + ',' + localStorage['LocalPost'].substr(1, (localStorage['LocalPost'].length) - 2) + ']';
                }
                $scope.posts = JSON.parse(localStorage['LocalPost']);
            }
            else {
                $scope.posts = JSON.parse(localStorage['LocalPost']);
            }
        })
    }
    else {
        $scope.posts = JSON.parse(localStorage['LocalPost']);
    }
});
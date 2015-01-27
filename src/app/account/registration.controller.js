(function () {
    'use strict';

    var app = angular.module('baseApp');

    app.directive('compareTo', function () {
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: '=compareTo'
            },
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.compareTo = function (modelValue) {
                    return !(scope.otherModelValue === 'none' && modelValue === true);
                };
                scope.$watch('otherModelValue', function () {
                    ngModel.$validate();
                });
            }
        };
    });

    app.controller('RegistrationController', RegistrationController);
    function RegistrationController($scope, $http,CONFIG) {
        var vm = this;

       // debugger;
        vm.registrationMessagesUrl = CONFIG.baseDir + 'app/' + CONFIG.codeCampType + '/account/registrationMessages.html';

        vm.registration = {
            firstName: 'George',
            lastName: 'Bush',
            email: 'george@whitehouse.gov',
            notificationDestinationText: true,
            notificationLevel: 'allsessions'
        };

        vm.registration.submitForm = function () {
            var config = {
                params: {
                    data: vm.registration
                }
            };
            $http.post('someserver.php', null, config)
                .success(function () {
                    //alert('success');
                })
                .error(function () {
                    //alert('failure');
                });

        };
    }

    RegistrationController.$inject = ['$scope', '$http','CONFIG'];

}());


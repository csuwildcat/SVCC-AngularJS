(function () {
    'use strict';


    var app = angular.module('svccApp', [
        'ngMessages',
        'ngResource',
        'ui.router',
        'pusher-angular'
    ]);


    app.config(['$stateProvider', '$urlRouterProvider',

        function ($stateProvider, $urlRouterProvider) {
            //$urlRouterProvider.otherwise('/');

            $stateProvider

                .state('svcc', {
                    url: '/svcc',
                    templateUrl: 'app/general/svcc.html',
                    controller: function ($scope) {
                    },
                    resolve: {
                        title: function ($timeout,$rootScope) {

                            return $timeout(function () {

                                    $rootScope.hideLoadingIcon = true;

                                    return 'from title function';
                                }
                                , 1500 // wait 2,5 second - and then replace ...loading...
                            );
                        }
                    }
                })
                .state('svcc.about', {
                    //url: '/svcc/about',
                    templateUrl: 'app/general/about.html',
                    resolve: {
                        title: function ($timeout) {
                            return $timeout(function () {
                                    return 'from title function';
                                }
                                , 500 // wait 2,5 second - and then replace ...loading...
                            );
                        }
                    }
                })
                .state('svcc.home', {
                    //url: '/svcc/home',
                    templateUrl: 'app/general/home.html',
                    resolve: {
                        title: function ($timeout) {
                            return $timeout(function () {
                                    return 'from title function';
                                }
                                , 500 // wait 2,5 second - and then replace ...loading...
                            );
                        }
                    }
                })


                //.state('home', {
                //    url: '/',
                //    templateUrl: 'app/general/home.html',
                //    controller: 'GeneralController as vm'
                //}).


                .state('register', {
                    url: '/register',
                    templateUrl: 'app/account/registration.html',
                    controller: 'RegistrationController as vm'
                }).
                state('login', {
                    url: '/login',
                    templateUrl: 'app/account/login.html',
                    controller: 'LoginController as vm'
                }).
                state('logout', {
                    url: '/logout',
                    templateUrl: 'app/general/home.html',
                    controller: 'LogoutController as vm'
                }).
                //state('about', {
                //    url: '/about',
                //    templateUrl: 'app/general/about.html',
                //    controller: 'GeneralController as vm'
                //}).

                // speakers
                state('speakers', {
                    url: '/speakers',
                    templateUrl: 'app/speakers/speakers.html',
                    controller: 'SpeakersController as vm',
                    resolve: {
                        speakerResourceService: 'speakerResourceService',
                        speakers: ['speakerResourceService', function (speakerResourceService) {
                            return speakerResourceService.query().$promise;
                        }]
                    }
                }).

                //state('speaker', {
                //    url: '/speaker/:id',
                //    templateUrl: 'app/speakers/speaker-detail.html',
                //    controller: 'SpeakerDetailController as vm',
                //    resolve: {
                //        speakerResourceService: 'speakerResourceService',
                //        speaker: function(speakerResourceService,$stateParams) {
                //            return speakerResourceService.get({id: $stateParams.id}).$promise;
                //        }
                //    }
                //}).


                state('speaker', {
                    abstract: true,
                    url: '/speaker',
                    //templateUrl: 'app/speakers/speaker-detail.html'
                    template: '<div ui-view></div>'
                }).
                state('speaker.id', {
                    parent: 'speaker',
                    url: '/:id',
                    templateUrl: 'app/speakers/speaker-detail.html',
                    controller: 'SpeakerDetailController as vm',
                    resolve: {
                        speakerResourceService: 'speakerResourceService',
                        speaker: ['speakerResourceService', '$stateParams', function (speakerResourceService, $stateParams) {
                            return speakerResourceService.get({id: $stateParams.id}).$promise;
                        }]
                    }
                }).

                state('speaker.idfeedback', {
                    parent: 'speaker',
                    url: '/:id/feedback',
                    templateUrl: 'app/speakers/speaker-detail-feedback.html',
                    controller: 'SpeakerDetailFeedbackController as vm',
                    resolve: {
                        speakerResourceService: 'speakerResourceService',
                        speaker: ['speakerResourceService', '$stateParams', function (speakerResourceService, $stateParams) {
                            return speakerResourceService.get({id: $stateParams.id}).$promise;
                        }]
                    }
                }).

                //state('speaker.feedback', {
                //    parent: '/speaker',
                //    url: '/feedback',
                //    templateUrl: 'app/speakers/speaker-detail-feedback.html'
                //}).


                //state('speaker.feedback', {
                //    url: '/:id/feedback',
                //    templateUrl: 'app/speakers/speaker-detail-feedback.html'
                //}).


                //sessions
                state('sessiondetail', {
                    url: '/sessions/:id',
                    templateUrl: 'app/sessions/session-detail.html',
                    controller: 'SessionDetailController as vm',
                    resolve: {
                        sessionResourceService: 'sessionResourceService',
                        session: ['sessionResourceService', '$stateParams', function (sessionResourceService, $stateParams) {
                            return sessionResourceService.get({id: $stateParams.id}).$promise;
                        }]
                    }
                }).
                state('sessions', {
                    url: '/sessions',
                    templateUrl: 'app/sessions/sessions.html',
                    controller: 'SessionsController as vm',
                    resolve: {
                        sessionResourceService: 'sessionResourceService',
                        sessions: ['sessionResourceService', function (sessionResourceService) {
                            return sessionResourceService.query().$promise;
                        }],
                        sessionDayOfWeekResourceService: 'sessionDayOfWeekResourceService',
                        sessionDayOfWeeks: ['sessionDayOfWeekResourceService', function (sessionDayOfWeekResourceService) {
                            return sessionDayOfWeekResourceService.query().$promise;
                        }]
                    }
                });

            //$locationProvider.html5Mode(true);

        }]);

    app.run(['$rootScope', function ($rootScope) {


        $rootScope.loginName = '';

        //var initInjector = angular.injector(['ng']);
        //var $http = initInjector.get('$http', '$rootScope');
        //
        ////console.log('fetchData called');
        //return $http.post('/rpc/Account/isLoggedIn').then(function (response) {
        //
        //    console.log('username: ' + response.data.attendeeResults.username);
        //
        //    //$rootScope.loginName = response.data.attendeeResults.sessionGuid;
        //    $rootScope.loginName = response.data.attendeeResults.username;
        //    $rootScope.sessionGuid = response.data.attendeeResults.sessionGuid;
        //    $rootScope.$apply();
        //
        //    //angular.module('svccApp').value('configData', angular.fromJson(response.data));
        //
        //
        //    //svccApp.value('configData', angular.fromJson(response.data));
        //
        //
        //}, function (errorResponse) {
        //    console.log('error from isLoggedIn Post ' + errorResponse);
        //
        //    // Handle error case
        //});


    }]);


}());
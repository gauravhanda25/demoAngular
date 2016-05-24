(function() {
    'use strict';

    angular.module('inventory1App')

    .service('$errors', ['$timeout', function($timeout) {
        angular.extend(this, {
            message: null,
            successMessage: false,
            lastErrorUrl: null,
            global: false,
            show: false,
            errorCodes: {
                PLACEHOLDER: 'There was a problem with your request. Please check all fields and try again.'
            },

            errorType: function(code, currentState) {
                var message = this.errorCodes[code],
                    genericMessage = 'Well, this is embarrassing, we were unable to complete your request, please try again in a few minutes.';

                if (angular.isObject(message)) {
                    this.message = angular.isString(message[currentState]) ? message[currentState] : genericMessage;
                } else {
                    this.message = angular.isString(message) ? message : genericMessage;
                }
            },

            clear: function() {
                var _this = this;
                this.show = false;

                $timeout(function() {
                    _this.message = null;
                }, 1000);
            },

            modal: function(msg) {
                this.message = msg;
                this.show = true;
            },

            genericMessage: function() {
                this.modal('Oops, unable to connect to MobCat. Please check your internet connection and try again.');
            },

            persist: angular.noop
        })
    }])

})();

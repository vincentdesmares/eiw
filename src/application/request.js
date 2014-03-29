(function () {
    'use strict';

    var request;

    /**
     * @class
     * @classdesc The Request class
     * @constructor
     */
    request = function (url, success, fail) {
        this.url = url;

        this.response = null;

        this.successCallback = null;
        if(success !== undefined) {
            this.successCallback = success;
        }
        this.failCallback    = null;
        if(fail !== undefined) {
            this.failCallback = fail;
        }
    };

    /**
     * Initialize the application
     *
     */
    request.prototype.bootstrap = function() {

    };

    request.prototype.isCachable = function() {
        return true;
    };

    request.prototype.getUrl = function() {
        return this.url;
    }

    request.prototype.getParameters = function() {
        return {};
    }

    request.prototype.setAnswer = function(answer) {
        this.response = answer;
        return this;
    }

    request.prototype.getAnswer = function() {
        if(this.response == null) {
            throw 'No answer have be bound to this request';
        }
        return this.response;
    }

    /**
     * Return the success callback of the request
     * @returns {null|function}
     */
    request.prototype.getSuccessCallback = function() {
        return this.successCallback;
    }

    request.prototype.getFailCallback = function() {
        return this.failCallback;
    }


    Eiw.Application.request = request;
}());
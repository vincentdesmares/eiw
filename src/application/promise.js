(function () {
    'use strict';

    var promise;

    /**
     * @class
     * @classdesc The Request class
     * @constructor
     */
    promise = function () {
        this.successCallback = null;
        this.failCallback = null;
    };

    /**
     * Call the success callback
     */
    promise.prototype.callSuccess = function() {
        if(this.successCallback !== null) {
            this.successCallback()
        }
        return this;
    }

    /**
     * Set the success callback, it will be called when the promise will have been set resolved
     */
    promise.prototype.success = function(callback) {
        return this.successCallback = callback;
    }

    /**
     * Call the fail callback
     */
    promise.prototype.callFail = function() {
        if(this.failCallback !== null) {
            this.failCallback()
        }
        return this;
    }

    /**
     * Set the fail callback, it will be called when the promise will have been set resolved
     */
    promise.prototype.fail = function(callback) {
        return this.failCallback = callback;
    }

    Eiw.Application.Promise = promise;
}());
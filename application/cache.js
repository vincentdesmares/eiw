(function () {
    'use strict';

    var cache;

    /**
     * @class
     * @classdesc The Application class
     * @constructor
     */
    cache = function () {

    };

    /**
     * Initialize the application
     *
     */
    cache.prototype.bootstrap = function() {
    };

    /**
     *
     * @param {Eiw.Application.response} answer
     * @returns {Eiw.Application.cache}
     */
    cache.prototype.store = function(answer) {
        return this;
    }

    /**
     * Test if a request is currently available in the cache
     *
     * @param {Eiw.Application.request} request
     * @returns {boolean}
     */
    cache.prototype.test = function(request) {
        return false;
    }

    cache.prototype.getRequestAnswer = function() {
        return new Eiw.Application.response('test content');
    }

    Eiw.Application.cache = cache;
}());
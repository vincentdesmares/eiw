(function () {
    'use strict';

    var answer;

    /**
     * @class
     * @classdesc The Application class
     * @constructor
     */
    answer = function (content, request) {
        this.content = content;
        this.request = request;
    };

    /**
     * Initialize the application
     *
     */
    answer.prototype.bootstrap = function() {

    };

    answer.prototype.getContent = function() {
        return this.content;
    }

    Eiw.Application.response = answer;
}());
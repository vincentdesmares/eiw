/**
 * Created by cold on 2/15/14.
 */
(function () {
    'use strict';

    var logger;

    /**
     * The Application class
     *
     * @constructor
     */
    logger = function () {

    };

    logger.prototype.bootstrap = function() {
    };

    logger.prototype.log = function(message) {
        if(typeof(window.console) !== 'Object') {
            return this;
        }
        console.log(message);
        return this;
    }

    Eiw.logger = logger;
}());
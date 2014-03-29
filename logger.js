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
        this.test = 1;
    };

    // Extend the Indicator Prototype
    //$.extend(application.prototype, new Eiw.Widget.());

    logger.prototype.bootstrap = function() {
    };

    logger.prototype.log = function(message) {
        console.log(message);
    }

    Eiw.logger = logger;
}());
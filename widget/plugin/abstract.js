/**
 * Created by cold on 3/2/14.
 */
(function () {
    'use strict';

    var plugin;

    /**
     * The Abstract Widget plugin class
     *
     * @constructor
     * @param application {Eiw.Application}
     */
    plugin = function (application) {
    };

    // Extend the Indicator Prototype
    //$.extend(application.prototype, new Eiw.Widget.());

    plugin.prototype.bootstrap = function() {
    };

    Eiw.Widget.Plugin.Abstract = plugin;
}());
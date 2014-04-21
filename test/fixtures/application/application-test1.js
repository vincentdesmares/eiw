/**
 * Created by cold on 2/24/14.
 */

(function () {
    'use strict';
    var application;
    application = function () {
        this.id  = 'app-test1';
    };
    $.extend(true, application.prototype, new Eiw.Application.Abstract());
    application.prototype.onPostBootstrap = function() {
    }

    application.prototype.onPostRender = function() {
    }

    window.Test1 = {};
    window.Test1.application = application;
}());



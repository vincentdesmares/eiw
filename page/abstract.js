(function () {
    'use strict';

    var page;

    /**
     * @class
     * @classdesc The page class. The page is different from the widget by two things.
     * @classdesc Only one page can be display at a time and the path of the URL is dedicated to the routing of pages
     *
     * @abstract
     * @constructor
     * @extends Eiw.Widget.Abstract
     * @member {Eiw.Widget.container} widgets
     */
    page = function () {
        this.route = '';
        this.widgets = null;
    };

    // Extend the Widget Prototype
    $.extend(true, page.prototype, new Eiw.Widget.Abstract());

    /**
     * Initialize the application
     *
     */
    page.prototype.bootstrap = function() {
        this.widgets = new Eiw.Widget.container(this.getApp());
        Eiw.Widget.Abstract.prototype.bootstrap.call(this);
    };

    /**
     * Only one page can be display at a time
     * @returns {string}
     */
    page.prototype.getNodeId = function() {
        return '#page-container';
    };

    page.prototype.isMatchingUrlPath = function() {
        return true;
    }

    /**
     * Return the route of the page
     *
     * @return {string}
     */
    page.prototype.getRoute = function() {
        return this.route;
    }

    page.prototype.getType = function() {
        return Eiw.Widget.types.page;
    }

    Eiw.page.Abstract = page;
}());
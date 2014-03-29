(function () {
    'use strict';

    var application;

    /**
     * @class
     * @classdesc The Application class
     * @abstract
     * @constructor
     *
     * @extends Eiw.Widget.Abstract
     * @member {Eiw.logger} logger
     * @member {Eiw.page.container} pages
     * @member {Eiw.Widget.container} widgets
     * @member {Eiw.router} router
     */
    application = function () {
        /**
         * @instance
         * @type {Eiw.router}
         */
        this.router  = null;
        this.widgets = null;
        this.pages   = null;
        this.logger  = null;
        this.requestManager = null;
    };

    // Extend the Widget Prototype
    $.extend(true, application.prototype, new Eiw.Widget.Abstract());

    /**
     * Initialize the application
     *
     */
    application.prototype.bootstrap = function() {
        this.application = this;

        this.logger = new Eiw.logger();
        this.logger.log('Application boostraping');

        this.requestManager = new Eiw.Application.requestManager();
        this.requestManager.bootstrap();

        this.router = new Eiw.router(this);
        this.router.bootstrap();

        this.pages = new Eiw.page.container(this);

        this.widgets = new Eiw.Widget.container(this);
        Eiw.Widget.Abstract.prototype.bootstrap.call(this);
        this.router.bindApplicationToUrl(this);
        this.onPostBootstrap();
    };

    /**
     *
     * @param {Eiw.Application.request} request
     * @param {function} callback
     */
    application.prototype.requestServer = function(request) {
        this.requestManager.requestServer(request);
    }

    /**
     * Start the application
     */
    application.prototype.start = function() {
        this.bootstrap();
        this.pages.bootstrap();
        this.widgets.bootstrap();
    };

    /**
     * @override
     * @returns {string}
     */
    application.prototype.getNodeId = function() {
        return '#' + this.getId() + '-app';
    }

    application.prototype.log = function(message) {
        this.logger.log(message);
    }

    application.prototype.getRouter = function() {
        return this.router;
    }

    application.prototype.getType = function() {
        return Eiw.Widget.types.application;
    }

    /**
     * This can be overloaded to do things after the bootstrap of the application
     * @abstract
     */
    application.prototype.onPostBootstrap = function() {};
    /**
     * This can be overloaded to do things after the load of the application
     * @abstract
     */
    application.prototype.onPostLoad = function() {};

    Eiw.Application.Abstract = application;
}());
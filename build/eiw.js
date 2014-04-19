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
(function () {
    'use strict';

    var requestManager;

    /**
     * @class
     * @classdesc The Application class
     * @abstract
     * @constructor
     *
     * @property {Eiw.Application.cache} cache
     */
    requestManager = function () {
        this.cache = null;
    };

    /**
     * Initialize the application
     *
     */
    requestManager.prototype.bootstrap = function() {
        this.cache = new Eiw.Application.cache();
    };

    /**
     *
     * @param {Eiw.Application.request} request
     */
    requestManager.prototype.requestServer = function(request) {
        var self = this;
        if(this.cache.test(request)) {
            var answer = this.cache.getRequestAnswer(request);
            request.setAnswer(answer);
            request.getSuccessCallback()(answer);
        } else {
            $.getJSON(request.getUrl(),
                  request.getParameters(),
                  function(answer) {
                      var answer = new Eiw.Application.response(answer);
                      request.setAnswer(answer);
                      if(request.isCachable()) {
                          self.cache.store(answer);
                      }
                      request.getSuccessCallback()(answer);
                  },
                  request.getFailCallback());
        }
    };

    Eiw.Application.requestManager = requestManager;
}());
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
(function () {
    'use strict';

    var pageContainer;

    /**
     * The Widget class
     *
     * @constructor
     */
    pageContainer = function (application) {
        /**
         *
         * @type {Eiw.Application}
         */
        this.application = application;

        /**
         *
         * @type {{Eiw.Widget.Abstract[]}}
         */
        this.pages = {};

        this.currentPageId = null;
    };

    pageContainer.prototype.bootstrap = function() {
        $.each(this.pages, function(index, page){
            page.bootstrap();
            page.onPostBootstrap();
            page.widgets.bootstrap();
        });
    };

    /**
     * Get a widget by it id
     *
     * @param id
     * @returns Eiw.Widget.Abstract
     */
    pageContainer.prototype.get = function(id) {
        var page = null;
        $.each(this.pages, function(index, value){
            if(value.getId() == id) {
                page = value;
            }
        });
        if(page != null) {
            return page;
        }
        throw 'page not found';
    };

    pageContainer.prototype.getAll = function() {
        return this.pages;
    }

    pageContainer.prototype.add = function(page) {
        if(this.currentPageId == null) {
            this.currentPageId = page.getId();
        }
        page.setApplication(this.getApplication());
        this.pages[page.getId()] = page;
        return this;
    }

    /**
     * Return the current active page
     * If there is no active page, return the first one loaded
     *
     * @returns {Eiw.page.Abstract}
     */
    pageContainer.prototype.getCurrentPage = function() {
        if(this.currentPageId == null) {
            throw 'No page loaded in the application';
        }
        return this.pages[this.currentPageId];
    };

    /**
     * Return the current active page
     * If there is no active page, return the first one loaded
     */
    pageContainer.prototype.setCurrentPage = function(pageId) {
        this.currentPageId = pageId;
        return this;
    };

    /**
     *
     * @returns {Eiw.Application}
     */
    pageContainer.prototype.getApplication = function() {
        return this.application;
    }

    Eiw.page.container = pageContainer;
}());
(function () {
    'use strict';

    var widget;

    /**
     * @class
     * @classdesc A bootstrap modal
     */
    widget = function (template) {
        this.id          = 'bootstrap-modal';
        this.initTemplateManager();
        this.templates.add(template);
    };

    $.extend(true, widget.prototype, new Eiw.Widget.Abstract());

    widget.prototype.showModal = function() {
        this.getJqueryNode().find('.modal').modal();
    };

    /**
     * Return a html container to be inserted in a modal template
     * A widget will be able to be inserted in it
     *
     * @param widgetId the id of the widget that will be inserted inside the container
     * @returns {string}
     */
    widget.prototype.getNewWidgetContainer = function(widgetId) {
        return '<div id="' + widgetId + '"></div>';
    };

    Eiw.Prefab.Widget.Bootstrap.Modal = widget;
}());
(function () {
    'use strict';

    var template;

    /**
     * The Widget class
     *
     * @abstract
     * @constructor
     */
    template = function () {
        this.id          = null;
        this.url         = null;
        this.content     = null;
    };

    // Extend the Indicator Prototype
    //$.extend(application.prototype, new Eiw.Widget.());

    template.prototype.bootstrap = function() {

    };

    template.prototype.getId = function() {
        return this.id;
    };

    template.prototype.getHtml = function() {
        return this.content;
    }

    template.prototype.load = function(callback) {
        var self = this;
        $.get(this.url, function(data){
            self.content = data;
            callback();
        });
    }

    Eiw.template.Abstract = template;
}());
(function () {
    'use strict';

    var templateContainer;

    /**
     * @class
     * @classdesc A container of multiple templates
     */
    templateContainer = function () {
        /**
         *
         * @type {{handlebar[]}}
         */
        this.templates = {};
        this.currentTemplateId = null;
    };

    // Extend the Indicator Prototype
    //$.extend(application.prototype, new Eiw.Widget.());

    templateContainer.prototype.bootstrap = function() {


    };

    /**
     * Get a widget by it id
     *
     * @param id
     * @returns Eiw.Widget.Abstract
     */
    templateContainer.prototype.get = function(id) {
        $.each(this.templates, function(index, template){
            if(template.getId() == id) {
                return widget;
            }
        });
        throw 'widget not found';
    };

    templateContainer.prototype.add = function(template) {
        if(this.currentTemplateId == null) {
            this.currentTemplateId = template.getId();
        }
        this.templates[template.getId()] = template;
    };

    /**
     * Return the current active template
     * If there is no active template, return the first one loaded
     */
    templateContainer.prototype.getCurrentTemplate = function() {
        if(this.currentTemplateId == null) {
            throw 'No template loaded for this object';
        }
        return this.templates[this.currentTemplateId];
    };

    Eiw.template.container = templateContainer;
}());
(function () {
    'use strict';

    var handlebar;

    /**
     * The Widget class
     *
     * @constructor
     * @extends Eiw.template.Abstract
     */
    handlebar = function (url, id) {
        if(id === undefined) {
            id = url;
        }
        this.id          = id;
        this.url         = url;
    };

    // Extend the Indicator Prototype
    $.extend(true, handlebar.prototype, new Eiw.template.Abstract());

    handlebar.prototype.bootstrap = function() {
    };

    handlebar.prototype.getHtml = function(widget) {
        return Handlebars.compile(this.content)(widget.getData());
    }

    Eiw.template.handlebar = handlebar;
}());
(function () {
    'use strict';

    var widget;

    /**
     * @class
     * @classdesc The Widget class
     * @abstract
     * @constructor
     *
     * @member {Eiw.template.container} templates
     * @member {string} id
     */
    widget = function () {
        this.id          = null;
        /**
         * @instance
         * @type {Eiw.template.container}
         */
        this.templates   = null;

        /**
         * Set to true to replace the node. Be carefull the content that you insert must also
         * contain the id of the widget to allow multiple reloading
         * @type {boolean}
         */
        this.replaceNode = false;

        /**
         *
         * @type {Eiw.Application}
         */
        this.application = null;

        /**
         * The API of the widget. If null no request will be made
         * if the api value is set, a request will be made at each loading
         *
         * @type {string|null}
         */
        this.api         = null;

        /**
         * Data of the widget
         *
         * @type {Object}
         */
        this.data = {};

        /**
         * If the widget have already been fully rendered
         * This flag is set after post render
         *
         * @type {boolean}
         */
        this.loaded = false;

        this.configuration = null;

        this.types = {};
        this.types.widget = 'widget';
        this.types.page = 'page';
        this.types.application = 'application';
    };

    /**
     * Set the application reference on the widget
     * @param application {Eiw.Application}
     */
    widget.prototype.setApplication = function(application) {
        this.application = application;
    };

    /**
     * Initialize the template manager
     * Will not do anything if already initialised
     */
    widget.prototype.initTemplateManager = function() {
        if(this.templates == null) {
            this.templates = new Eiw.template.container();
        }
    }

    widget.prototype.bootstrap = function() {
        this.initTemplateManager();
        this.configuration = new Eiw.Widget.Configuration();
    };

    /**
     * Get the id of the widget
     * A widget id must be unique on all the site
     *
     * @returns {null|*|string}
     */
    widget.prototype.getId = function() {
        return this.id;
    };

    widget.prototype.getType = function() {
        return Eiw.Widget.types.widget;
    }

    /**
     * Get the Jquery node of the widget
     * This is the only GOOD way to get a widget DOM access
     *
     * @returns {*|jQuery|HTMLElement}
     */
    widget.prototype.getJqueryNode = function() {
        var node = $(this.getNodeId());
        if(node.length == 0) {
            throw 'A widget have no node found: ' + this.getId();
        }
        return node;
    };

    /**
     * Return true if the widget have a placeholder in the page
     * @returns {boolean}
     */
    widget.prototype.hasJqueryNode = function() {
        var node = $(this.getNodeId());
        if(node.length == 0) {
            return false;
        }
        return true;
    }

    widget.prototype.getNodeId = function() {
        return '#' + this.getId();
    };

    /**
     * Loading data and template of the widget
     * @todo add promise to templates
     */
    widget.prototype.load = function() {
        this.onPreLoad();
        var template = this.templates.getCurrentTemplate();
        var promise = new Eiw.Application.Promise();
        var self = this;
        template.load(function() {
            if(self.hasApi()) {
                var request = self.getNewRequest(promise);
                self.getApp().requestServer(request);
            } else {
                self.onPreRender();
                self.render(function(){
                    self.loaded = true;
                    promise.callSuccess();
                });
            }
        });
        return promise;
    }

    widget.prototype.getNewRequest = function(promise) {
        var self = this;
        return new Eiw.Application.request(
            this.getApi(),
            function(answer) {
                if(self.onPostApiRequest() === false) {
                    return;
                }
                self.data = answer.getContent();
                self.log('Data loaded');
                self.onPreRender();
                self.render(function(){
                    promise.callSuccess();
                });
            }
        );
    }

    /**
     * Return true if a API URL is set on the widget
     * else false
     *
     * @returns {boolean}
     */
    widget.prototype.hasApi = function() {
        return this.api !== null;
    };

    /**
     * Get the api url of the widget
     *
     * @returns {string|null|string}
     */
    widget.prototype.getApi = function() {
        return this.api;
    }

    /**
     * Return the data of the widget
     *
     * @returns {Object}
     */
    widget.prototype.getData = function() {
        return this.data;
    }

    /**
     * Set the data of the widget
     * Data is waited as a key/value array
     *
     * @param data
     * @returns {Eiw.Widget.Abstract}
     */
    widget.prototype.setData = function(data) {
        this.data = data;
        return this;
    }

    /**
     * Return true if the widget have data else return false
     *
     * @returns {boolean}
     */
    widget.prototype.hasData = function() {
        if(this.data.length > 0) {
            return true;
        }
        return false;
    }

    /**
     * This method get the html generated by
     * the template and put it inside the content of the
     * widget
     *
     * @param callback
     */
    widget.prototype.render = function(callback) {
        this.log('Rendering');
        if(this.replaceNode === true) {
            this.getJqueryNode().replaceWith(this.templates.getCurrentTemplate().getHtml(this));
        } else {
            this.getJqueryNode().html(this.templates.getCurrentTemplate().getHtml(this));
        }

        if(this.onPostRender() === false) {
            return;
        }
        if(callback != undefined) {
            callback();
        }
    };

    /**
     * Get the application reference
     * @returns {Eiw.Application}
     */
    widget.prototype.getApp = function() {
        return this.application;
    }

    /**
     * Log something
     * The widget id will be linked to the message
     *
     * @param message
     */
    widget.prototype.log = function(message) {
        this.getApp().log('#' + this.getId() + ':' +  message);
    }

    widget.prototype.isLoaded = function() {
        return this.loaded;
    }

    widget.prototype.extend = function(plugin) {
        $.extend(true, this.prototype, plugin);
    }

    /**
     * Return the configuration of the widget
     *
     * @returns {Eiw.Widget.ConfigurationS}
     */
    widget.prototype.getConfiguration = function()
    {
        return this.configuration;
    }

    widget.prototype.onPostBootstrap = function(){};
    widget.prototype.onPostApiRequest = function(){};
    widget.prototype.onPreLoad = function(){};
    widget.prototype.onPreRender = function(){};
    widget.prototype.onPostRender = function(){};

    /**
     *
     * @type {widget}
     */
    Eiw.Widget.Abstract = widget;
}());
(function () {
    'use strict';

    var configuration;

    /**
     * The Configuration Class
     *
     * @constructor
     */
    configuration = function () {
        /**
         *
         * @type {Eiw.Application}
         */
        this.data = {};
    };

    /**
     * Get a value by it key
     *
     * @param configurationKey
     * @returns {Eiw.Widget.Configuration}
     * @throws Throw an error if configuration key not found
     */
    configuration.prototype.getValue = function(configurationKey) {
        var configurationValue = null;
        var valueFound = false;
        $.each(this.data, function(key, value){
            if(key == configurationKey) {
                configurationValue = value;
                valueFound = true;
                return false;
            }
        });
        if(valueFound) {
            return configurationValue;
        }
        throw 'Configuration key not found : [' + configurationKey + ']';
    };

    /**
     * Add a value to the configuration
     *
     * @param {string} key
     * @param {mixed} value
     * @returns {Eiw.Widget.Configuration}
     */
    configuration.prototype.setValue = function(key, value) {
        this.data[key] = value;
        return this;
    }

    configuration.prototype.getAllAsArray = function() {
        return this.data;
    }

    Eiw.Widget.Configuration = configuration;
}());
(function () {
    'use strict';

    var widgetContainer;

    /**
     * The Widget class
     *
     * @constructor
     * @param application {Eiw.Application}
     */
    widgetContainer = function (application) {
        /**
         *
         * @type {Eiw.Application}
         */
        this.application = application;
        /**
         *
         * @type {{Eiw.Widget.Abstract[]}}
         */
        this.widgets = {};
    };

    // Extend the Indicator Prototype
    //$.extend(application.prototype, new Eiw.Widget.());

    widgetContainer.prototype.bootstrap = function() {
        $.each(this.widgets, function(index, widget){
            widget.bootstrap();
            widget.onPostBootstrap();
        });
    };

    /**
     * Get a widget by it id
     *
     * @param id
     * @returns Eiw.Widget.Abstract
     */
    widgetContainer.prototype.get = function(id) {
        var widget = null;
        $.each(this.widgets, function(index, value){
            if(value.getId() == id) {
                widget = value;
            }
        });
        if(widget != null) {
            return widget;
        }
        throw 'widget not found';
    };

    /**
     * Add a widget to the list
     *
     * @param widget
     * @returns {widgetContainer}
     */
    widgetContainer.prototype.add = function(widget) {
        widget.setApplication(this.getApplication());
        this.widgets[widget.getId()] = widget;
        return this;
    }

    /**
     *
     * @returns {Eiw.Application}
     */
    widgetContainer.prototype.getApplication = function() {
        return this.application;
    }

    Eiw.Widget.container = widgetContainer;
}());
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
/**
 * Created by cold on 3/2/14.
 */
(function () {
    'use strict';

    var plugin;

    /**
     * The Bootstrap Modal Widget plugin class
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

    /**
     * @param {string} content
     *
     * @todo replace with a template
     */
    plugin.prototype.render = function() {
        var content = '';
        content = '\
        <div class="modal fade">\
            <div class="modal-dialog modal-lg">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <h3>Pick what you want !</h3>\
                    </div>\
                    <div class="modal-body">\
                    ' + 'test' + '\
                    </div>\
                </div>\
            </div>\
        </div>';
        return content;
    }

    Eiw.Widget.Plugin.Bootstrap.Modal = plugin;
}());
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
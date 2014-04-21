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
        throw 'Widget with id [' + id + '] not found.';
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
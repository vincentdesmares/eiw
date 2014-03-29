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
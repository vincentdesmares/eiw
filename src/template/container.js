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

    /**
     * Return true if the container hold at least a template
     */
    templateContainer.prototype.isEmpty = function() {
        return $.isEmptyObject(this.templates);
    };

    Eiw.template.container = templateContainer;
}());
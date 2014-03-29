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
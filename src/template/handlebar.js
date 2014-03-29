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
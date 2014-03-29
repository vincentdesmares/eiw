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
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
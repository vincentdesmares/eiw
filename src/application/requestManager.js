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
/**
 * Created by cold on 2/15/14.
 */
(function () {
    'use strict';

    var router;

    /**
     * The Application class
     * For documentation about the URL : http://en.wikipedia.org/wiki/Uniform_resource_locator
     *
     * Definition of the URL parts
     *     scheme://domain:port/path?query_string#fragment_id
     * Matching
     *     scheme://domain:port/page?widgets#widgets
     * @constructor
     * @param application {Eiw.Application}
     */
    router = function (application) {
        this.application = application;
    };

    // Extend the Indicator Prototype
    //$.extend(application.prototype, new Eiw.Widget.());

    router.prototype.bootstrap = function() {
        $.address.autoUpdate(false);
    };

    router.prototype.bindApplicationToUrl = function(application)
    {
        var self = this;
        $.address.externalChange(function(event) {
            self.handleUrlChange(false);
        });

        $.address.internalChange(function(event) {
            self.handleUrlChange(true);
        });
    }

    router.prototype.handleUrlChange = function(internal) {
        if(internal === true) {
            this.log('Address changing by internal action');
        } else {
            this.log('Address changing by external action');
        }
        var state = this.getPath();
        this.log('State :' + state);
        this.log('Parameters:' + $.address.parameterNames().join(','));

        if(state != undefined) {
            var page  = this.getPageMatchingPath(state);
            if(page != null) {
                this.log('Page matching: ' + page.getId());
                this.getApp().pages.setCurrentPage(page.getId());
            } else {
                this.log('No page are matching the current state:' + state);
                alert('404, fail, bouuu');
            }
        } else {
            this.log('No path in the url, default page will be loaded');
        }
        if(this.getApp().isLoaded()) {
            this.getApp().pages.getCurrentPage().load();
        } else {
            this.getApp().load();
        }
    }

    router.prototype.getPath = function() {
        return $.address.state() || window.location.pathname.slice(0, -1);
    }

    router.prototype.getPageMatchingPath = function(path) {
        var pageMatching;

        $.each(this.getApp().pages.getAll(), function(index, page) {
            var route = page.getRoute();
            if(new RegExp(route).test(path)) {
                pageMatching = page;
            }
        });

        return pageMatching;
    }
    /**
     *
     * @param path
     * @return {Eiw.router}
     */
    router.prototype.setPath = function(path) {
        $.address.state(path);
        this.savePageState();
        return this;
    }

    router.prototype.savePageState = function() {
        $.address.update();
    }

    /**
     *
     * @returns {Eiw.Application}
     */
    router.prototype.getApp = function() {
        return this.application;
    }

    router.prototype.log = function(message) {
        this.getApp().log('#router: ' + message);
    }

    Eiw.router = router;
}());
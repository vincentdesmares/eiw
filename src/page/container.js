(function () {
    'use strict';

    var pageContainer;

    /**
     * The Widget class
     *
     * @constructor
     */
    pageContainer = function (application) {
        /**
         *
         * @type {Eiw.Application}
         */
        this.application = application;

        /**
         *
         * @type {{Eiw.Widget.Abstract[]}}
         */
        this.pages = {};

        this.currentPageId = null;
    };

    pageContainer.prototype.bootstrap = function() {
        $.each(this.pages, function(index, page){
            page.bootstrap();
            page.onPostBootstrap();
            page.widgets.bootstrap();
        });
    };

    /**
     * Get a widget by it id
     *
     * @param id
     * @returns Eiw.Widget.Abstract
     */
    pageContainer.prototype.get = function(id) {
        var page = null;
        $.each(this.pages, function(index, value){
            if(value.getId() == id) {
                page = value;
            }
        });
        if(page != null) {
            return page;
        }
        throw 'page not found';
    };

    pageContainer.prototype.getAll = function() {
        return this.pages;
    }

    pageContainer.prototype.add = function(page) {
        if(this.currentPageId == null) {
            this.currentPageId = page.getId();
        }
        page.setApplication(this.getApplication());
        this.pages[page.getId()] = page;
        return this;
    }

    /**
     * Return the current active page
     * If there is no active page, return the first one loaded
     *
     * @returns {Eiw.page.Abstract}
     */
    pageContainer.prototype.getCurrentPage = function() {
        if(this.currentPageId == null) {
            throw 'No page loaded in the application';
        }
        return this.pages[this.currentPageId];
    };

    /**
     * Return the current active page
     * If there is no active page, return the first one loaded
     */
    pageContainer.prototype.setCurrentPage = function(pageId) {
        this.currentPageId = pageId;
        return this;
    };

    /**
     *
     * @returns {Eiw.Application}
     */
    pageContainer.prototype.getApplication = function() {
        return this.application;
    }

    Eiw.page.container = pageContainer;
}());